import React from "react";
import logo_stefan from '../Photos/Stefan.jpg'
import logo_felix from '../Photos/Felix.jpg'
import logo_sebastian from '../Photos/Sebastian.jpg'

export default function Home() {
    return (
        <>
            <div>
                <h1>Deine besten Rezepte an einem Ort</h1>
                <h2>Speichere alle Rezepte an einem Ort und schon kannst du diese jederzeit abrufen.</h2>
                <h3 style={{fontSize: '20px' }}>Egal ob am PC, dem iPad, Smartphone und Co. Du brauchst nur einen modernen Browser :) </h3>

                <h3>Das sind wir:</h3>

                <h4>Felix</h4>
                <img src={logo_felix} alt="Bild Felix" height={180} />

                <h4>Sebastian</h4>
                <img src={logo_sebastian} alt="Bild Sebastian" height={180} />

                <h4>Stefan</h4>
                <img src={logo_stefan} alt="Bild Stefan" height={180} />
            </div>
        </>
    )


}




