import React from "react";
import { Link } from "react-router-dom";
import Calendar from "../../components/Calendar";
import PatientList from "../../components/PatientList";
import PatientInfo from "../../components/PatientInfo";

import "./style.css";

const Home = () => {
    return (
        <div id="home-container">
            <div id="home">
                <div className="home-col">
                    <PatientInfo />
                    <Calendar />
                </div>
                <div className="home-col">
                    <PatientList />
                </div>
            </div>
        </div>
    );
};

export default Home;