import InventoryOverview from "./viewInventory";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";


export default function Inventory() {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect(() => {
        async function getInventory() {

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

        getInventory()
    }, [ingredients.length]);


    async function onSubmit(e) {
        e.preventDefault();

        const newRecipe = {...formData};

        await fetch("http://localhost:5000/api/inventory", { //todo catch response
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        }).catch(error => { //todo: error message not showing
            window.alert(error);
            return;
        });
        //todo: no confirmation showing
        setFormData({ingredient: "", state: true})


        //todo this reloads all ingredients?
        const newResponse = await fetch(`http://localhost:5000/api/inventory`)
        const newIngredients = await newResponse.json();
        setIngredients(newIngredients)
    }

    async function invertState(ingredient) {
        const response = await fetch(`http://localhost:5000/api/inventory/${ingredient._id}/invert`, {method: 'PUT'})
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }
        //todo this reloads all ingredients?
        const newResponse = await fetch(`http://localhost:5000/api/inventory`)
        const newIngredients = await newResponse.json();
        setIngredients(newIngredients)

    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <span style={{width: "15%"}}></span>
                <h1 style={{width: "70%", textAlign: "center"}}>My Inventory</h1>
                <span style={{width: "15%", textAlign: "right"}}>
                    <Link to={`/inventory/edit`} className="button"> Edit Inventory </Link>
                </span>
            </div>
            <div style={{textAlign: "right", padding: "1rem"}}>
                <form style={{display:"inline"}} onSubmit={onSubmit}>
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
                <select id="sort">
                    <option value="oldest">Oldest First</option>
                    <option value="newest">Newest First</option>
                    <option value="alphabetically">A - Z</option>
                </select>
            </div>
            <div>
                <InventoryOverview ingredients={ingredients} invertStateHandler={invertState} />
            </div>
        </>
    )
}