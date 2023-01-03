import React from "react";
import logo_stefan from './Photos/Stefan.jpg'
import logo_felix from './Photos/Felix.jpg'
import logo_sebastian from './Photos/Sebastian.jpg'
import background_photo from './Photos/background_photo.jpg'

export default function Home() {
    console.log(logo_felix, logo_stefan, logo_sebastian, background_photo);

    return (
        <>
            <div>
                <h1 style={{ color: 'black', fontSize: '40px' }}>Deine besten Rezepte an einem Ort</h1>
                <p style={{ color: 'black', fontSize: '20px' }}>Speichere alle Rezepte an einem Ort und schon kannst du diese jederzeit abrufen.</p>
                <p style={{ color: 'black', fontSize: '20px' }}>Egal ob am PC, dem iPad, Smartphone und Co. Du brauchst nur einen modernen Browser :) </p>

                <h3>Das sind wir:</h3>

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




