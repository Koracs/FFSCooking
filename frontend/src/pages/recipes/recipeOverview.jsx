import "../../styles.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function RecipeOverview({recipes}) {
    return (
        <div className="RecipeOverview">
            {recipes.map((recipe) => <div key={recipe._id} className="recipeButton">
                {
                    <Link className="fillDiv" to={`/recipes/${recipe._id}`}> {recipe.name}</Link>
                }
            </div>)}
        </div>
    );
}