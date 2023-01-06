import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../styles.css";


export default function ViewInventory({ingredients,invertStateHandler}) {

    const invertState = (ingredient) => {
        invertStateHandler(ingredient);
    }

    return (
        <div>
            <ul className="overview">
                {ingredients.map((ingredient) => <li key={ingredient._id}>
                    {
                        <button className={"ingredientButton"}
                                style={{background: ingredient.state ? "rgba(0,255,0,0.6)" : "rgba(255,0,0,0.6)"}}
                                key={ingredient._id} onClick={() => invertState(ingredient)}>{ingredient.ingredient}
                        </button>
                    }
                </li>)}
            </ul>
        </div>
    );



}