import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import lachs_photo from './Photos/Produkte.jpg'

export default function AddRecipe() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{
            ingredient: ""
        }]
    });

    const {name, description, ingredients} = formData
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onIngredientChange = (idx) => (e) => {
        const newIngredients = formData.ingredients.map((ingredient, index) => {
            if (idx !== index) return ingredient;
            return {...ingredient, ingredient: e.target.value};
        })
        setFormData({
            name: formData.name,
            description: formData.description,
            ingredients: newIngredients
        })
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newRecipe = {...formData};

        await fetch("http://localhost:5000/api/recipes", { //todo catch response
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
        setFormData({name: "", description: "", ingredients: [{ingredient: ""}]})
        navigate("/recipes/new") //todo redirect to new recipe link (post response?)
    }

    console.log(lachs_photo);

    return (
        <div style={{ backgroundImage:`url(${lachs_photo})`}}>
            <h1>Create new Recipe</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Enter a recipe name"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        placeholder="Enter a description"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients: </label>
                    {formData.ingredients.map((ingredient, index) =>
                        <input
                            key={index}
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            value={ingredient.ingredient}
                            placeholder="Ingredient"
                            onChange={onIngredientChange(index)}
                        />
                    )}
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <button onClick={() => {
                setFormData({
                    name: formData.name,
                    description: formData.description,
                    ingredients: formData.ingredients.concat({ingredient: ""})
                })
            }}>Add Ingredient
            </button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}