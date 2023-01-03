import "../styles.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function RecipeOverview() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
            async function getRecipes() {
                const response = await fetch(`http://localhost:5000/api/recipes`);

                if (!response.ok) {
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
        const test = recipes.sort((a, b) => a.name.localeCompare(b.name))
        return test.map((recipe) => {
            return (
                <li key={recipe._id}>
                    <Link className="recipeButton" to={`/recipes/${recipe._id}`}> {recipe.name}</Link>
                </li>
            );
        });
    }

    function sortRecipes(value){
        console.log(value);
        console.log(value.value);
        /*if(id === 1) console.log(1)
        if(id === 2) console.log(2)
        if(id === 3) console.log(3)*/
        console.log("nix")
    }

    return (
        <div >
            <h1>Recipe Overview</h1>
            <label>Sort: </label>
            <select id="sort" onChange={() => sortRecipes(this)}>
                <option value="Value1">Oldest First</option>
                <option value="Value2">Newest First</option>
                <option value="Value3">A - Z</option>
            </select>
            <ul className="overview">
                {recipeList()}
            </ul>
        </div>
    );
}