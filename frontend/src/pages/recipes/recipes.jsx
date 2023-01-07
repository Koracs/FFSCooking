import RecipeOverview from "./recipeOverview";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Filter from "../../components/filter";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [cookableRecipes, setCookableRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("oldest")
    const [search, setSearch] = useState("");
    const [cookable, setCookable] = useState(false);


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
        getCookable();
    }, [recipes.length]);

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

    function searchRecipes(recipes) {
        if (cookable) {
            return cookableRecipes.filter((recipe) => recipe.name.toLowerCase().includes(search))
        } else {
            return recipes.filter((recipe) => recipe.name.toLowerCase().includes(search))
        }
    }

    async function getCookable() {
        const response = await fetch(`http://localhost:5000/api/inventory?filter=onStock`)

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }

        const ingredients = await response.json();
        const filteredIngredients = Object.entries(ingredients).map(([key, value]) => {
            return value.ingredient.toLowerCase()
        })

        let newList = []

        for (const reci in recipes) {
            let isValid = true
            for (const inc in recipes[reci].ingredients) {
                let currentIng = recipes[reci].ingredients[inc].ingredient.toLowerCase()
                if (!filteredIngredients.includes(currentIng)) {
                    isValid = false
                    break;
                }
            }
            if (isValid) {
                newList.push(recipes[reci])
            }
        }

        setCookableRecipes(newList)
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
                <label>Only show Cookable Recipes: </label>
                <input type="checkbox" id="cookable" name="cookable" onChange={(e) => setCookable(e.target.checked)}/>
                <label style={{paddingLeft: "2rem"}}>Search: </label>
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