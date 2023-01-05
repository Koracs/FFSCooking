import RecipeOverview from "./recipeOverview";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("oldest")

    useEffect(() => {
            console.log('useEffect: ')
            console.log(recipes)
            getRecipes();
        },
        [recipes.length]
    );

    useEffect(() => {
            console.log('useEffect: '+sortOrder)
            sortRecipes(sortOrder)
        },
        [sortOrder]);

    async function getRecipes() {
        const response = await fetch(`http://localhost:5000/api/recipes`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const recipes = await response.json();
        setRecipes(recipes);
        setIsLoading(false);
    }

    //https://dev.to/ramonak/react-how-to-dynamically-sort-an-array-of-objects-using-the-dropdown-with-react-hooks-195p
    function sortRecipes(sortOrder) {
        // eslint-disable-next-line default-case
        switch (sortOrder) {
            case 'oldest':
                console.log("oldest");
                setRecipes(recipes.sort((o1, o2) => o1.createdAt.localeCompare(o2.createdAt)));
                break;
            case 'newest':
                console.log("newest");
                setRecipes(recipes.sort((o1, o2) => o2.createdAt.localeCompare(o1.createdAt)));
                break;
            case 'alphabetically':
                console.log("alphabetically");
                setRecipes(recipes.sort((o1, o2) => o1.name.localeCompare(o2.name)));
                break;
        }
    }

    return (
        <>
            {isLoading ? <div>Loading</div> : <>
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
                <select id="sort" onChange={(e) => sortRecipes(e.target.value)} >
                    <option value="oldest">Oldest First</option>
                    <option value="newest">Newest First</option>
                    <option value="alphabetically">A - Z</option>
                </select>
            </div>
            <div>
                <RecipeOverview recipes={recipes}/>
            </div>
            </>}
        </>
    )
}