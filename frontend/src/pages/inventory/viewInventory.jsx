import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


export default function ViewInventory() {
    const [record, setRecord] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/api/inventory/638b41271591fccd1692e7bf`)
            console.log(response)
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const record = await response.json();
            setRecord(record)
            setIsLoading(false);
        }

        getRecords()

        return;
    }, [params.id, navigate]);

    async function changeStatus(inventoryId, ingredientId) {
        const response = await fetch(`http://localhost:5000/api/inventory/${inventoryId}/ingredient/${ingredientId}`, { method: 'PUT'})
        console.log(inventoryId)
        console.log(ingredientId)
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`
            window.alert(message)
            return
        }
        const record = await response.json();
        setRecord({...record, record})
    }

    //todo loading spinner / content loader
    return (

        <div>
            <div className="row-cols-auto">
                <h1>{record.name} Inventar <a className="btn"></a> </h1>
                {
                    //<Link className="btn btn-warning" to={`/recipes/details/${record._id}`}>bearbeiten</Link>
                }
            </div>
            <div className="tile-container">
                {!isLoading ? record.ingredients.map((ingredient, index) =>
                    {
                        var color
                        if (ingredient.state) color ="btn-success"
                        else
                            color = "btn-danger"
                        return <button key={index} className={`tile border border-1 text-center btn ${color}`} onClick={
                            () => changeStatus(record._id, ingredient._id)
                        }>{ingredient.ingredient}</button>


                    }
                    ) : null}

            </div>

        </div>

    );
}