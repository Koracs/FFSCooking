import React from "react";
import {Link, NavLink} from "react-router-dom"

const Footer = ({ history, handleSubmit }) => {
    return (
        <nav className ="header">
            <a href="https://www.jku.at/institut-fuer-wirtschaftsinformatik-communications-engineering/">Made for WIN CE</a>
            <a>Made by Felix, Sebastian & Stefan</a>
        </nav>
    );
};

export default Footer;