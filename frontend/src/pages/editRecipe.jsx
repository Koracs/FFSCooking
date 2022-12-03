import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function EditRecipe() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{
            ingredient: ""
        }]
    });

    const { name, description, ingredients } = formData
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`);

            if (!response.ok) {
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const recipe = await response.json();
            if (!recipe) {
                window.alert(`Recipe with id ${id} not found`);
                navigate("/");
                return;
            }

            setFormData(recipe);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

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

        await fetch(`http://localhost:5000/api/recipes/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch(error => { //todo: error message not showing
            window.alert(error);
            return;
        });
        //todo: no confirmation showing

        navigate(`/recipes/${params.id}`)
    }

    async function deleteRecipe(e) {
        e.preventDefault();
        if(window.confirm("Delete Recipe?")){
            await fetch(`http://localhost:5000/api/recipes/${params.id}`, {
                method: "DELETE"
            }).catch(error => { //todo: error message not showing
                window.alert(error);
                return;
            });
            //todo: no confirmation showing

            navigate(`/recipes`)
        }
    }
//todo recipe form component for edit and view component
    return(
        <div>
            <h1>Edit Recipe</h1>
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
            <div>
                <button onClick={deleteRecipe}>Delete Recipe</button>
            </div>
        </div>
    )
}