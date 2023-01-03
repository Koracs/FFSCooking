import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../styles.css";


export default function ViewInventory() {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        ingredient: "",
        state: true
    });

    const {ingredient, state} = formData
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

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

    async function onDelete(e) {
        e.preventDefault();
        if (window.confirm("Delete Inventory?")) {

            await fetch(`http://localhost:5000/api/inventory${par_del.id}`, {
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
                    <button className={"ingredientButton"} style={{background: ingredient.state ? "rgba(0,255,0,0.6)" : "rgba(255,0,0,0.6)"}}
                            key={ingredient._id} onClick={() => invertState(ingredient)}>
                        {ingredient.ingredient} </button>
                </li>
            );
        });
    }

    const par_del = "";

    return (
        <div>
            <ul className="overview">
                {ingredientList()}
            </ul>
            <br/>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="ingredient">Add Ingredient: </label>
                    <input
                        type="text"
                        id="ingredient"
                        name="ingredient"
                        value={ingredient}
                        placeholder="Enter an ingredient"
                        onChange={onChange}
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );

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


}