import React from "react";

const CalendarDays = (props) => {
    const { date } = props;

    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let weekDayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
    
    return (
        <div id="calendar-table-content">

        </div>
    );
};

export default CalendarDays;