from datetime import datetime, timedelta

def time_to_minutes(time_str):
    """Convert time string (HH:MM) to minutes since midnight."""
    hh, mm = map(int, time_str.split(':'))
    return hh * 60 + mm

def minutes_to_time(minutes):
    """Convert minutes since midnight to time string (HH:MM)."""
    hh = minutes // 60
    mm = minutes % 60
    return f"{hh:02d}:{mm:02d}"

def find_free_slots(provider_schedule, appointments, provider_id, date):
    """Find free slots for a provider on a given date."""
    day_of_week = date.isoweekday() % 7 + 1  # Adjust for Sunday=1
    schedule = provider_schedule[(provider_schedule['PROVIDERID'] == provider_id) & 
                                 (provider_schedule['DAYOFWEEK'] == day_of_week)]
    
    # Get existing appointments for the provider on the given date
    busy_slots = appointments[(appointments['PROVIDERID'] == provider_id) & 
                              (appointments['APPOINTMENTDATE'] == date)]
    
    # Convert schedule and busy slots to intervals
    free_slots = []
    for _, row in schedule.iterrows():
        start_time = time_to_minutes(row['SLOTSTARTTIME'])
        end_time = time_to_minutes(row['SLOTENDTIME'])
        free_slots.append((start_time, end_time))
    
    # Subtract busy intervals from free slots
    for _, row in busy_slots.iterrows():
        start_time = time_to_minutes(row['APPOINTMENTSTARTTIME'])
        end_time = start_time + row['APPOINTMENTDURATION']
        free_slots = subtract_interval(free_slots, (start_time, end_time))
    
    return free_slots

def subtract_interval(free_slots, busy_interval):
    """Subtract a busy interval from free slots."""
    new_slots = []
    for slot in free_slots:
        if busy_interval[0] >= slot[1] or busy_interval[1] <= slot[0]:
            # No overlap, keep the slot as is
            new_slots.append(slot)
        else:
            # Split the free slot around the busy interval
            if busy_interval[0] > slot[0]:
                new_slots.append((slot[0], busy_interval[0]))
            if busy_interval[1] < slot[1]:
                new_slots.append((busy_interval[1], slot[1]))
    return new_slots

def schedule_patients(new_patients, provider_info, appointments):
    """Schedule appointments for new patients."""
    scheduled_appointments = []
    for _, patient in new_patients.iterrows():
        registration_date = datetime.strptime(patient['REGISTRATIONDATE'], '%Y-%m-%d')
        state = patient['STATE']
        program = patient['PROGRAM']
        
        # Find eligible providers in the patient's state
        eligible_providers = provider_info[provider_info['STATE'] == state]['PROVIDERID'].unique()
        
        # Iterate through days starting from registration date
        for days_after in range(0, 30):  # Check up to 30 days ahead
            current_date = registration_date + timedelta(days=days_after)
            for provider in eligible_providers:
                # Check if provider has fewer than 5 appointments on the current day
                daily_appointments = appointments[(appointments['PROVIDERID'] == provider) & 
                                                  (appointments['APPOINTMENTDATE'] == current_date)]
                if len(daily_appointments) >= 5:
                    continue  # Provider is fully booked for the day
                
                # Find free slots for the provider on the current day
                free_slots = find_free_slots(provider_info, appointments, provider, current_date)
                for slot in free_slots:
                    slot_start, slot_end = slot
                    if slot_end - slot_start >= 60:  # Ensure slot can fit a 60-minute appointment
                        # Assign the earliest possible slot
                        appointment_time = datetime.combine(current_date, datetime.min.time()) + timedelta(minutes=slot_start)
                        scheduled_appointments.append({
                            'PATIENTID': patient['PATIENTID'],
                            'APPOINTMENTDATE': current_date,
                            'APPOINTMENTSTARTTIME': appointment_time,
                            'PROVIDERID': provider
                        })
                        # Add the new appointment to the appointments list to enforce constraints
                        appointments = appointments.append({
                            'APPOINTMENTID': len(appointments) + 1,  # Assign a unique ID
                            'APPOINTMENTDATE': current_date,
                            'APPOINTMENTSTARTTIME': appointment_time,
                            'APPOINTMENTDURATION': 60,
                            'PROVIDERID': provider
                        }, ignore_index=True)
                        break
                else:
                    continue  # No suitable slot found for this provider
                break  # Move to the next patient
            else:
                continue  # No provider available on this day
            break  # Move to the next patient
    return scheduled_appointments

scheduled_appointments = schedule_patients(new_patients, provider_info, appointments)
ttfa_list = calculate_ttfa(scheduled_appointments, new_patients)
mean_ttfa, median_ttfa = aggregate_metrics(ttfa_list)
print(f"Mean TTFA: {mean_ttfa} hours")
print(f"Median TTFA: {median_ttfa} hours")

df = pd.DataFrame(scheduled_appointments)
df.to_csv('scheduled_appointments.csv', index=False)

# Load the CSV file into a DataFrame
df = pd.read_csv('scheduled_appointments.csv')

# Convert 'APPOINTMENTDATE' to datetime for accurate sorting
df['APPOINTMENTDATE'] = pd.to_datetime(df['APPOINTMENTDATE'])

# Sort the DataFrame by 'APPOINTMENTDATE'
df_sorted = df.sort_values(by='APPOINTMENTDATE')

# Save the sorted DataFrame to a new CSV file
df_sorted.to_csv('sorted_scheduled_appointments.csv', index=False)