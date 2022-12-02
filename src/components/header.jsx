import React from "react";
import "./header.css"
import {Link, NavLink} from "react-router-dom"

const Header = ({ history, handleSubmit }) => {
    return (
        <nav className ="header">
            <NavLink to="/" className="site-title">FSS Cooking</NavLink>
            <ul>
                <NavLink to={"/recipes"}>Recipes</NavLink>
                <NavLink to={"/inventory"}>Inventory</NavLink>
            </ul>
        </nav>
    );
};

export default Header;