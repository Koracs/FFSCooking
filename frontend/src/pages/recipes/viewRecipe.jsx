import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

export default function ViewRecipe() {
    const [recipe, setRecipe] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true)
        const id = params.id.toString();
        try{
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`);

            if(!response.ok){
                throw Error("get Recipe: " + response.status + " " + response.statusText);
            }

            const recipe = await response.json();

            setRecipe(recipe);
            setIsLoading(false);
        }catch (e) {
            window.alert("Error: "+e.message);
            setIsLoading(false);
            navigate("/recipes");
        }

    }

    useEffect(() => {
        fetchData();
    }, [params.id, navigate]);


    return (
        <>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <span style={{width: "25%"}}></span>
                <h1 style={{width: "50%", textAlign: "center"}}>{recipe.name}</h1>
                <span style={{width: "25%", textAlign: "right"}}>
                    <Link to={`/recipes/edit/${recipe._id}`} className="button"> Edit Recipe </Link>
                    <span> </span>
                    <Link to={`/recipes`} className="button"> Go Back </Link>
                </span>
            </div>
            {isLoading ? <div>Loading</div> : <>
            <div className="recipeView">
                <p>Created: {recipe.createdAt.substring(8,10)+"."+recipe.createdAt.substring(5,7)+"."+recipe.createdAt.substring(0,4)}
                    <dd/> Last updated: {recipe.updatedAt.substring(8,10)+"."+recipe.updatedAt.substring(5,7)+"."+recipe.updatedAt.substring(0,4)}</p>
                <div className="recipeIngredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {!isLoading ? recipe.ingredients.map((ingredient, index) =>
                            <li key={index}> {ingredient.ingredient} </li>) : null}
                    </ul>
                </div>
                <div className="recipeDescription">
                    <h2>Description</h2>
                    <p style={{whiteSpace:"pre-line",textAlign:"left"}}>{recipe.description}</p>
                </div>
            </div>
            </>}
        </>
    );
}