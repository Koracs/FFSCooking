import InventoryOverview from "./viewInventory";
import {Link} from "react-router-dom";
import inventory_photo from './Inventory_Photos/Produkte.jpg'
import React from "react";


export default function Inventory() {
    console.log(inventory_photo);
    return (
        <>
            <div style={{ backgroundImage:`url(${inventory_photo})`}}>
                <InventoryOverview/>
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
        </>
    )
}