import RecipeOverview from "./recipeOverview";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Filter from "../../components/filter";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("oldest")
    const [search, setSearch] = useState("");
    const [filterSelection, setFilterSelection] = useState(1);
    const inventoryFilter = {1: "all, I don't care", 2: "for which i have goods"};
    const categories = ["vegan", "I don't care"]

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

    function searchRecipes(recipes) {
        return recipes.filter((recipe) => recipe.name.toLowerCase().includes(search))
    }

    const handleSelect = selection => {
        console.log("selection: " + selection)

        setFilterSelection(selection);
    };


    async function applyFilter() {
        console.log(filterSelection)

        if(parseInt(filterSelection) !== 2) return
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/inventory?filter=onStock`)

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }

        const ingredients = await response.json();
        const filteresIngredients = Object.entries(ingredients).map(([key, value]) => {
            return value.ingredient.toLowerCase()
        })
        console.log(filteresIngredients)

        let newList = []
        let newList2 = []

        for (const reci in recipes) {
            let isValid = true
            console.log("NEW recipe")
            for (const inc in recipes[reci].ingredients) {
                let currentIng = recipes[reci].ingredients[inc].ingredient.toLowerCase()
                console.log(filteresIngredients.includes(currentIng))
                if(!filteresIngredients.includes(currentIng)) {
                    isValid = false
                    break;
                }
            }
            console.log("CONCLUSION: "+ isValid)
            if(isValid){
                newList.push(recipes[reci]._id)//only ID
                newList2.push(recipes[reci])// recipe object
            }
        }
        console.log(newList)
        //const sortedRecipes = [].concat(recipes).filter(a => newList.includes(a._id))
        //sortedRecipes.filter(a => newList.includes(a._id))
        //console.log(sortedRecipes)
        //setRecipes([].concat(recipes).filter(a => newList.includes(a._id)))

        const sortedRecipes = recipes.slice().filter(a => newList.includes(a._id))
        console.log("sortedRecipes")
        console.log(sortedRecipes)


        setRecipes([...sortedRecipes])
        console.log(recipes)
        setIsLoading(false);
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
                <Filter label="Filter" onApply={applyFilter}>
                    I want recepies:<br/>
                    {
                        Object.entries(inventoryFilter).map(([key, value]) => {
                            const isSelected = parseInt(filterSelection) === parseInt(key);
                            return (
                                <div key={key}>
                                    {
                                        <input type="radio" id={key} value={value}
                                               checked={isSelected} onChange={() => {
                                            handleSelect(key)
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
            {isLoading ? <div>Loading</div> : <>
                <div>
                    <RecipeOverview recipes={searchRecipes(recipes)}/>
                </div>
            </>}
        </>
    )
}