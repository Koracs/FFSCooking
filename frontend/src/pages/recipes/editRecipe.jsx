import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditRecipe() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{
            ingredient: ""
        }]
    });

    const {name, description, ingredients} = formData
    const params = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState({})

    useEffect(() => {
        fetchData();

    }, [params.id]);

    async function fetchData() {
        const id = params.id.toString();
        try {
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`);

            if(!response.ok){
                throw Error("fetch Recipes: " + response.status + " " + response.statusText);
            }

            const recipe = await response.json();
            setFormData(recipe);
        }
        catch (e){
            window.alert("Error: " + e.message);
            navigate(`/recipes/${id}`)
        }
    }

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

        try {
            const response = await fetch(`http://localhost:5000/api/recipes/${params.id}`, {
                method: "PUT",
                body: JSON.stringify(newRecipe),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(!response.ok){
                throw Error("edit Recipe: " + response.status + " " + response.statusText);
            }

            //window.alert("successfully updated"); //ToDo wenn Zeit dann ModalDialog
            navigate(`/recipes/${params.id}`)

        } catch (e) {
            window.alert("Error: "+e.message);
            navigate(`/recipes/edit/${params.id}`)
        }
    }

    async function deleteRecipe(e) {
        e.preventDefault();
        if (window.confirm("Delete Recipe?")) {

            try {
                const response = await fetch(`http://localhost:5000/api/recipes/${params.id}`, {
                    method: "DELETE"
                });

                if(!response.ok){
                    throw Error("edit Recipe: " + response.status + " " + response.statusText);
                }

                //window.alert("successfully deleted"); //ToDo wenn Zeit dann ModalDialog
                navigate(`/recipes`)
            } catch (e) {
                window.alert("Error: "+e.message);
                navigate(`/recipes/edit/${params.id}`)
            }
        }
    }

//todo? recipe form component for edit and view component (callback functions)
    return (
        <>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <span style={{width: "25%"}}></span>
                <h1 style={{width: "50%", textAlign: "center"}}>Edit Recipe</h1>
                <span style={{width: "25%", textAlign: "right"}}>
                    <Link to={`/recipes`} className="button"> Go Back </Link>
                </span>
            </div>
            <div className="recipeView">
                <form onSubmit={onSubmit}>
                    <div style={{alignItems: "center"}}>
                        <h2 style={{display: "inline-block", paddingRight: "1rem", alignItems: "center"}}>Name</h2>
                        <input
                            style={{fontSize:"1.25rem"}}
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter a recipe name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="recipeIngredients">
                        <h2>Ingredients</h2>
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
                    <div className="recipeDescription">
                        <h2>Description</h2>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            placeholder="Enter a description"
                            style={{height: "15rem", width: "70%"}}
                            onChange={onChange}
                        />
                    </div>
                    <div className="recipeDescription">
                        <button type="submit">Submit</button>
                        <br/>
                        <button onClick={deleteRecipe}>Delete Recipe</button>
                    </div>
                </form>
                <div className="recipeIngredients">
                    <button onClick={() => {
                        setFormData({
                            name: formData.name,
                            description: formData.description,
                            ingredients: formData.ingredients.concat({ingredient: ""})
                        })
                    }}>Add Ingredient
                    </button>
                </div>
                <div className="recipeDescription"></div>
            </div>
        </>
    )
}