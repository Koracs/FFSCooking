import "./overview.css";
import "./recipe.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const RecipeLink = (props) => (
    <div>
    <Link to={`/recipes/${props.recipe._id}`}> {props.recipe.name}</Link>
    </div>
);


export default function RecipeOverview() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
            async function getRecipes() {
                const response = await fetch(`http://localhost:5000/api/recipes`);

                if (!response.ok) {
                    console.log("error")
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
                const recipes = await response.json();
                setRecipes(recipes);
            }

            getRecipes();
            return;
        },
        [recipes.length]
    );


    function recipeList() {
        return recipes.map((recipe) => {
            return (

                <li className={"header"} key={recipe._id}>
                    <RecipeLink recipe={recipe}/>
                </li>
            );
        });
    }

    return (
        <div>
            <h1>Recipe Overview</h1>
            <ul className="overview">
                {recipeList()}
            </ul>
        </div>
    );
}