import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../styles.css";


export default function ViewInventory({ingredients,invertStateHandler}) {

    const invertState = (ingredient) => {
        invertStateHandler(ingredient);
    }

    return (
        <div>
            <ul className="InventoryOverview">
                {ingredients.map((ingredient) => <li key={ingredient._id}>
                    {
                        <button className={"ingredientButton"}
                                style={{background: ingredient.state ? "rgb(42,204,113)" : "rgb(239,105,110)"}}
                                key={ingredient._id} onClick={() => invertState(ingredient)}>{ingredient.ingredient}
                        </button>
                    }
                </li>)}
            </ul>
        </div>
    );



}