import React from "react";
import "./home.css";
import logo_stefan from './Photos/Stefan.jpg'
import logo_felix from './Photos/Felix.jpg'
import logo_sebastian from './Photos/Sebastian.jpg'
import background_photo from './Photos/background_photo.jpg'

export default function Home() {
    console.log(logo_felix, logo_stefan, logo_sebastian, background_photo);

    return (
        <>
            <div style={{ backgroundImage:`url(${background_photo})`}}>
                <br/>
                <h1>Willkommen auf deinem Kochbuch</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3>Deine Rezepte an einem Ort</h3>
                <p>Speichere alle Rezepte an einem Ort und schon kannst du diese jederzeit abrufen.</p>
                <p>Egal ob am PC, dem iPad, Smartphone und Co. Du brauchst nur einen modernen Browser :) </p>
                <br/>

                <h3>Über uns:</h3>

                <h4>Felix</h4>
                <img src={logo_felix} alt="Bild Felix" height={180} />

                <h4>Sebastian</h4>
                <img src={logo_sebastian} alt="Bild Sebastian" height={180} />

                <h4>Stefan</h4>
                <img src={logo_stefan} alt="Bild Stefan" height={180} />

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
                <br/>
                <br/>
                <br/>




            </div>




        </>
    )


}




