import "../../styles.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function RecipeOverview({recipes}) {
    return (
        <ul className="overview">
            {recipes.map((recipe) => <li key={recipe._id}>
                {
                    <Link className="recipeButton" to={`/recipes/${recipe._id}`}> {recipe.name}</Link>
                }
            </li>)}
        </ul>
    );
}