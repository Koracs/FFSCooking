import {Link} from "react-router-dom";
import React from "react";

export function errorPage(errordict) {

    return (
        <div className={"alert"}>
            <h3>An Error has occured!</h3>
            <table style={{margin: "0 auto"}}>
                <tbody style={{textAlign: "left"}}>
                <tr>
                    <td><u>Status text:</u></td>
                    <td>{errordict["statustext"] ? errordict["statustext"] : "N/A"}</td>
                </tr>
                <tr>
                    <td><u>Message:</u></td>
                    <td>{errordict["message"] ? errordict["message"] : "Please contact your admin!"}</td>
                </tr>
                </tbody>
            </table>
            <Link to={`/`} style={{marginTop: "2rem"}} className="button"> go back to home </Link>
        </div>
    );
}