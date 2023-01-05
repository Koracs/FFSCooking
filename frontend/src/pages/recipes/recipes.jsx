import RecipeOverview from "./recipeOverview";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Recipes() {
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

    function sortRecipes(value) {
        const test = recipes.sort((a, b) => a.name.localeCompare(b.name))
        console.log(value);
        console.log(value.value);
        /*if(id === 1) console.log(1)
        if(id === 2) console.log(2)
        if(id === 3) console.log(3)*/
        console.log("nix")
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <span style={{width: "15%"}}></span>
                <h1 style={{width: "70%", textAlign: "center"}}>Recipe Overview</h1>
                <span style={{width: "15%", textAlign: "right"}}>
                    <Link to={`/recipes/new`} className="button"> Add new Recipe </Link>
                </span>
            </div>
            <div style={{textAlign:"right", padding:"1rem"}}>
                <label>Search: </label>
                <input
                    id="search"
                    name="search"
                    className="bn outline-0"
                    type="search"
                    placeholder="Find items by name..."
                />
                <label style={{paddingLeft: "2rem"}}>Sort: </label>
                <select id="sort">
                    <option value="oldest">Oldest First</option>
                    <option value="newest">Newest First</option>
                    <option value="alphabetically">A - Z</option>
                </select>
            </div>
            <div>
                <RecipeOverview recipes={recipes}/>
            </div>


        </>
    )
}