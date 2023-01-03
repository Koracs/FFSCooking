import InventoryOverview from "./viewInventory";
import {Link} from "react-router-dom";
import React from "react";


export default function Inventory() {
    return (
        <>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                <span style={{width:"15%"}}></span>
                <h1 style={{width:"70%", textAlign:"center"}}>My Inventory</h1>
                <span style={{width:"15%",textAlign:"right"}}>
                    <Link to={`/inventory/edit`} className="button"> Edit Inventory </Link>
                </span>
            </div>
            <div >
                <InventoryOverview/>
            </div>
        </>
    )
}