import React, { useState } from "react";
import { Header } from "semantic-ui-react";

import "./style.css";

const Calendar = () => {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [date, setDate] = useState(new Date());

    return (
        <div>
            <Header as="h1">Calendar</Header>
            <Header as="h2">{months[setDate(date.getMonth())]} {setDate(date.getFullYear())}</Header>
        </div>
    );
};

export default Calendar;