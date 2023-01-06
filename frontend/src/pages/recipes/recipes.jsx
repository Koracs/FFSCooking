import RecipeOverview from "./recipeOverview";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("oldest")
    const [search, setSearch] = useState("");

    async function getRecipes() {
        setIsLoading(true);
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

    useEffect(() => {
            getRecipes();
        },[recipes.length]
    );

    useEffect(() => {
        sortRecipes(sortOrder);
    }, [sortOrder])


    function sortRecipes(sort) {
        const sortedRecipes = [].concat(recipes)
        switch (sort) {
            case 'newest':
                setRecipes(sortedRecipes.sort((a, b) => -1 * a.createdAt.localeCompare(b.createdAt)))
                break;
            case 'oldest':
                setRecipes(sortedRecipes.sort((a, b) => a.createdAt.localeCompare(b.createdAt)))
                break;
            case 'alphabetically':
                setRecipes(sortedRecipes.sort((a, b) => a.name.localeCompare(b.name)))
                break;
            default:
                break;
        }
    }

    function searchRecipes(recipes){
        return recipes.filter((recipe) => recipe.name.toLowerCase().includes(search))
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
            <div style={{textAlign: "right", padding: "1rem"}}>
                <label>Search: </label>
                <input
                    id="search"
                    name="search"
                    className="bn outline-0"
                    type="search"
                    placeholder="Filter recipes by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <label style={{paddingLeft: "2rem"}}>Sort: </label>
                <select onChange={(e) => setSortOrder(e.target.value)} id="sort">
                    <option value="oldest">Oldest First</option>
                    <option value="newest">Newest First</option>
                    <option value="alphabetically">A - Z</option>
                </select>
            </div>
            {isLoading ? <div>Loading</div> : <>
                <div>
                    <RecipeOverview recipes={searchRecipes(recipes)}/>
                </div>
            </>}
        </>
    )
}