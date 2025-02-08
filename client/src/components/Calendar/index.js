import React, { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";

import "./style.css";

const Calendar = () => {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setDate(date);
    }, []);

    return (
        <div id="calendar-container">
            <div id="calendar">
                <Header id="calendar-header" as="h2">{months[date.getMonth()]} {date.getFullYear()}</Header>
            </div>
            <div id="calendar-body">
                <div id="calendar-table-header">
                    {days.map((day, index) => {
                            return (
                                <div key={index}>{day}</div>
                            );
                        })}
                </div>
                <div id="calendar-table">

                </div>
            </div>
        </div>
    );
};

export default Calendar;