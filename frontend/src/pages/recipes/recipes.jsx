import RecipeOverview from "./recipeOverview";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Filter from "../../components/filter";
import {errorPage} from "../../components/error";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("oldest")
    const [search, setSearch] = useState("");
    const [error, setError] = useState({})
    const [filterSelection, setFilterSelection] = useState(1);
    const inventoryFilter = {1: "all, I don't care", 2: "for which i have goods"};

    async function getRecipes() {
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/api/recipes`);

            if(!response.ok){
                throw Error("Recipes: " + response.status + " " + response.statusText);
            }

            const recipes = await response.json();
            setRecipes(recipes);
            setIsLoading(false);

        } catch (e) {
            setIsLoading(false);
            setError({statustext: e.message, message: "Please contact your admin!"})
        }

    }

    async function getAvailableIngredients() {
        try {
            const response = await fetch(`http://localhost:5000/api/inventory?filter=onStock`)

            if(!response.ok){
                throw Error("Available Ingredients: " + response.status + " " + response.statusText);
            }

            const result = await response.json();
            setAvailableIngredients(result)
        } catch (e) {
            setIsLoading(false);
            setError({statustext: e.message, message: `Please contact your admin!`})
        }
    }

    useEffect(() => {
            getRecipes();
            getAvailableIngredients();
        }, [recipes.length]
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

    function searchRecipes(input) {
        return input.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()))
    }

    function cookableRecipes(input) {
        const ingredientNames = availableIngredients.map(e => e.ingredient.toLowerCase())
        const filteredRecipeIDs = []

        for (const reci in input) {
            let isValid = true
            for (const inc in input[reci].ingredients) {
                const currentIng = recipes[reci].ingredients[inc].ingredient.toLowerCase()
                if (!ingredientNames.includes(currentIng)) {
                    isValid = false
                    break;
                }
            }
            if (isValid) {
                filteredRecipeIDs.push(input[reci]._id)
            }
        }
        return input.filter(e => filteredRecipeIDs.includes(e._id))
    }

    function applyFilter(input) {

        let filteredInput = input;

        if (parseInt(filterSelection) === 2) {
            filteredInput = cookableRecipes(filteredInput)
        }
        //please insert here filter extensions

        if (search) {
            filteredInput = searchRecipes(filteredInput)
        }

        return filteredInput
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
                <Filter label="Filter">
                    I want recepies:<br/>
                    {
                        Object.entries(inventoryFilter).map(([key, value]) => {
                            const isSelected = parseInt(filterSelection) === parseInt(key);
                            return (
                                <div key={key}>
                                    {
                                        <input type="radio" id={key} value={value}
                                               checked={isSelected} onChange={() => {
                                            setFilterSelection(key)
                                        }}/>
                                    }
                                    {value}
                                </div>
                            );
                        })
                    }
                </Filter>

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
            {Object.keys(error).length > 0 ? errorPage(error) : isLoading ? <div>Loading</div> :
                <div>
                    <RecipeOverview recipes={applyFilter(recipes)}/>
                </div>}
        </>
    )
}