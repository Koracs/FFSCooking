import React from "react";
import {Link, NavLink} from "react-router-dom"

const Header = ({ history, handleSubmit }) => {
    return (
        <nav className ="header">
            <NavLink to="/" className="site-title">FSS Cooking</NavLink>
            <ul>
                <li><NavLink to={"/recipes"}>Recipes</NavLink></li>
                <li><NavLink to={"/inventory"}>Inventory</NavLink></li>
            </ul>
        </nav>
    );
};

export default Header;