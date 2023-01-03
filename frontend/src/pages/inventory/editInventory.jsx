import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";


export default function EditInventory() {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function onDelete(id) {
        if(window.confirm("Delete Ingredient?")) {

            await fetch(`http://localhost:5000/api/inventory/${id}`, {
                method: "DELETE",
            }).catch(error => {
                window.alert(error);
                return;
            });

            const newResponse = await fetch(`http://localhost:5000/api/inventory`)
            const newIngredients = await newResponse.json();
            setIngredients(newIngredients)
        }
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
        return;
    }, [ingredients.length]);


    function ingredientList() {
        return ingredients.map((ingredient) => {
            return (

                <li key={ingredient._id}>
                    <button className={"button"} key={ingredient._id} onClick={() => onDelete(ingredient._id)}>
                        {ingredient.ingredient} </button>
                </li>
            );
        });
    }

    return (
        <div>
            <h1>Edit Inventory</h1>
            <div style={{textAlign:"right"}}>
                <Link to={`/inventory/`} className="button"> Go Back </Link>
                <br/>
                <br/>
            </div>
            <ul className="overview">
                {ingredientList()}
            </ul>
        </div>
    );






}