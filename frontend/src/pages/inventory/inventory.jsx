import InventoryOverview from "./viewInventory";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";


export default function Inventory() {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("oldest")
    const [formData, setFormData] = useState({
        ingredient: "",
        state: true
    });
    const {ingredient, state} = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    async function getInventory() {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/inventory`)

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }

        const ingredients = await response.json();
        setIngredients(ingredients)
        setIsLoading(false);
    }

    useEffect(() => {
        getInventory()
    }, [ingredients.length]);

    useEffect(() => {
        console.log(sortOrder)
        sortInventory(sortOrder);
    }, [sortOrder])

    useEffect(() => {
        console.log(ingredients)
    }, [ingredients])

    function sortInventory(sort) {
        switch (sort) {
            case 'newest':
                setIngredients(ingredients.sort((a, b) => -1 * a.createdAt.localeCompare(b.createdAt)))
                break;
            case 'oldest':
                setIngredients(ingredients.sort((a, b) => a.createdAt.localeCompare(b.createdAt)))
                break;
            case 'alphabetically':
                setIngredients(ingredients.sort((a, b) => a.ingredient.localeCompare(b.ingredient)))
                break;
            default:
                break;
        }
    }


    async function onSubmit(e) {
        e.preventDefault();
        const newIngredient = {...formData};

        await fetch("http://localhost:5000/api/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newIngredient),
        }).catch(error => {
            window.alert(error);
            return;
        });
        setFormData({ingredient: "", state: true})

        getInventory()
    }

    async function invertState(ingredient) {
        const response = await fetch(`http://localhost:5000/api/inventory/${ingredient._id}/invert`, {method: 'PUT'})
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }
        getInventory()
    }


    return (
        <>
            {isLoading ? <div>Loading</div> : <>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    <span style={{width: "15%"}}></span>
                    <h1 style={{width: "70%", textAlign: "center"}}>My Inventory</h1>
                    <span style={{width: "15%", textAlign: "right"}}>
                    <Link to={`/inventory/edit`} className="button"> Edit Inventory </Link>
                </span>
                </div>
                <div style={{textAlign: "right", padding: "1rem"}}>
                    <form style={{display: "inline"}} onSubmit={onSubmit}>
                        <label htmlFor="ingredient">Add Ingredient: </label>
                        <input
                            type="text"
                            id="ingredient"
                            name="ingredient"
                            value={ingredient}
                            placeholder="Enter an ingredient"
                            onChange={onChange}
                        />
                    </form>
                    <label style={{paddingLeft: "2rem"}}>Sort: </label>
                    <select onChange={(e) => setSortOrder(e.target.value)} id="sort">
                        <option value="oldest">Oldest First</option>
                        <option value="newest">Newest First</option>
                        <option value="alphabetically">A - Z</option>
                    </select>
                </div>
                <div>
                    <InventoryOverview ingredients={ingredients} invertStateHandler={invertState}/>
                </div>
            </>}
        </>
    )
}