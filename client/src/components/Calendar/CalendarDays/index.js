import React from "react";

const CalendarDays = (props) => {
    const { day, changeCurrentDay } = props;

    let firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
    let weekDayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
        if ( day === 0 && weekDayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekDayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay =  {
            currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
            date: new Date(firstDayOfMonth),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }

        currentDays.push(calendarDay);
    }
    
    return (
        <div id="calendar-table-content">
            {currentDays.map((day, index) => {
                console.log(day);
                return (
                    <div 
                        className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                        onClick={() => props.changeCurrentDay(day)} 
                        key={index}
                    >
                        <p>{day.number}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CalendarDays;