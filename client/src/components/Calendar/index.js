import React, { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import CalendarDays from "./CalendarDays";
import { axiosInstance } from "../../utils/api";
import { csvToJSON } from "../../utils/csvToJSON";
import Appointments from "../../assets/Existing_Appointments.csv";

import "./style.css";


const Calendar = () => {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    csvToJSON(Appointments);
    console.log(Appointments);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/appointments");
                setAppointments(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
        console.log(appointments);
    }, []);

    useEffect(() => {
        setDate(date);
    }, []);

    const changeCurrentDay = (day) => {
        setDate(new Date(day.year, day.month, day.number));
    };

    return (
        <div id="calendar-container">
            <div id="calendar">
                <Header id="calendar-header" as="h2">{months[date.getMonth()]} {date.getFullYear()}</Header>
            </div>
            <div id="calendar-body">
                <div id="calendar-table-header">
                    {days.map((day, index) => {
                        return (
                            <div key={index}>
                                <p>{day}</p>
                            </div>
                        );
                    })}
                </div>
                <div id="calendar-table">
                    <CalendarDays day={date} changeCurrentDay={changeCurrentDay} />
                </div>
            </div>
        </div>
    );
};

export default Calendar;