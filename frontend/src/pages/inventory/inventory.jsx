import InventoryOverview from "./viewInventory";
import {useNavigate, useNavigation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EditInventory from "./editInventory";
import {errorPage} from "../../components/error";


export default function Inventory() {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode,setEditMode] = useState(false);
    const [sortOrder, setSortOrder] = useState("oldest")
    const [error, setError] = useState({})
    const [formData, setFormData] = useState({
        ingredient: "",
        state: true
    });
    const navigate = useNavigate();
    const {ingredient, state} = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    async function getInventory() {
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/api/inventory`)

            if(!response.ok){
                throw Error("get inventory: " + response.status + " " + response.statusText);
            }

            const ingredients = await response.json();
            setIngredients(ingredients)
            setIsLoading(false);

        }catch (e) {
            console.log(error)
            setIsLoading(false);
            setError({statustext: e.message, message: "Please contact your admin!"})
        }

    }

    async function onDelete(ingredient) {
        if (window.confirm("Delete Ingredient?")) {

            try {
                const response =  await fetch(`http://localhost:5000/api/inventory/${ingredient._id}`, {
                    method: "DELETE",
                });

                if(!response.ok){
                    throw Error("delete Ingredient: " + response.status + " " + response.statusText);
                }

                window.alert("successfully deleted!");

                const newResponse = await fetch(`http://localhost:5000/api/inventory`)

                if(!newResponse.ok){
                    throw Error("get inventory: " + response.status + " " + response.statusText);
                }

                const newIngredients = await newResponse.json();
                setIngredients(newIngredients)

            }catch (e) {
                window.alert("Error: "+e.message);
            }

        }
    }

    useEffect(() => {
        getInventory()
    }, [ingredients.length]);

    useEffect(() => {
        sortInventory(sortOrder);
    }, [sortOrder])

    function sortInventory(sort) {
        const sortedIngredients = [].concat(ingredients)
        switch (sort) {
            case 'newest':
                setIngredients(sortedIngredients.sort((a, b) => -1 * a.createdAt.localeCompare(b.createdAt)))
                break;
            case 'oldest':
                setIngredients(sortedIngredients.sort((a, b) => a.createdAt.localeCompare(b.createdAt)))
                break;
            case 'alphabetically':
                setIngredients(sortedIngredients.sort((a, b) => a.ingredient.localeCompare(b.ingredient)))
                break;
            default:
                break;
        }
    }


    async function onSubmit(e) {
        e.preventDefault();
        const newIngredient = {...formData};

        try{
            const response = await fetch("http://localhost:5000/api/inventory", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newIngredient),
                });

            if(!response.ok){
                throw Error("add Ingredient: " + response.status + " " + response.statusText);
            }
        }catch (e) {
            window.alert("Error: "+e.message);
        }
        
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
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                    <span style={{width: "15%"}}></span>
                    <h1 style={{width: "70%", textAlign: "center"}}>My Inventory</h1>
                    <span style={{width: "15%", textAlign: "right"}}>
                    <button onClick={() => setEditMode(!editMode)} className="button">{editMode? "Go Back" : "Edit Inventory"}</button>
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
            { Object.keys(error).length > 0 ? errorPage(error) : isLoading ? <div>Loading</div> : <>
                {editMode? <EditInventory ingredients={ingredients} deleteHandler={onDelete}/>
                    : <InventoryOverview ingredients={ingredients} invertStateHandler={invertState}/>}
            </>}
        </>
    )
}