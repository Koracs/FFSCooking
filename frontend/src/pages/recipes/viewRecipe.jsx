import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

export default function ViewRecipe() {
    const [recipe, setRecipe] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
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

            setRecipe(recipe);
            setIsLoading(false);
        }

        fetchData();

        return;
    }, [params.id, navigate]);
    //todo loading spinner / content loader
    return (
        <>
            <section>
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <p>Zutaten:</p>
                <ul>
                    {!isLoading ? recipe.ingredients.map((ingredient, index) =>
                        <li key={index}> {ingredient.ingredient} </li>) : null}
                </ul>
            </section>
            <section>
                <div>
                    <Link to={`/recipes/edit/${recipe._id}`} className=""> Edit Recipe </Link>
                </div>
            </section>
        </>
    );
}