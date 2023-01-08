import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";


export default function EditInventory({ingredients,deleteHandler}) {

    const deleteIngredient= (ingredient) => {
        deleteHandler(ingredient);
    }

    return (
        <div>
            <ul className="InventoryOverview">
                {ingredients.map((ingredient) => <li key={ingredient._id}>
                    {
                        <button className={"ingredientButton"} key={ingredient._id}
                                onClick={() => deleteIngredient(ingredient)}>{ingredient.ingredient}
                        </button>

                    }
                </li>)}
            </ul>
        </div>
    );


}