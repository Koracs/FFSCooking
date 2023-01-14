import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <>
            <div>
                <br/>
                <h1>Deine besten Rezepte an einem Ort</h1>
                <h3>Speichere alle Rezepte an einem Ort und schon kannst du diese jederzeit abrufen.
                    <br/>Verwalte dein Haushaltsinventar direkt von der selben Stelle aus.
                    <br/>Lasse dir kochbare Rezepte anhand deiner Zutaten zu Hause anzeigen.
                </h3>
                <br/>
                <br/>
                <ul className="RecipeOverview" style={{width:"70%"}}>
                    <li className="recipeButton" style={{height:'150px'}}>
                        <Link className="fillDiv" to={"/recipes"}>Rezepte</Link>
                    </li>

                    <li className="recipeButton" style={{height:'150px'}}>
                        <Link className="fillDiv" to={"/inventory"}>Inventar</Link>
                    </li>
                </ul>
                <br/>
                <br/>
                <h3>Du bist auf der Suche nach leckeren Rezepten für deinen Kochalltag?</h3>
                <div style={{textAlign: "justify", marginLeft: "25%", marginRight: "25%", whiteSpace:"pre-line"}}>
                    <p> Dann bist du bei FSS Cooking genau richtig. Wir lassen unserer Leidenschaft für Essen und Trinken freien Lauf und zeigen dir mit inspirierenden Kochrezepten, dass guter Geschmack und Spaß am Kochen für uns an erster Stelle stehen.</p>
                    <p> Wir lassen uns für jeden Geldbeutel und jeden Anlass neue Rezeptideen einfallen, egal ob schnell und einfach, vegetarisch, vegan, festlich oder trendy. Klick dich durch, lass dich inspirieren und dann nichts wie ran an die Kochlöffel! </p>
                        Bist du offen für vielfältige Koch-Inspiration, aber nach deinem Geschmack? Filtere nach deinen Vorlieben, um die Ergebnisse perfekt auf dich anzupassen. Du hast schon eine Idee, was heute Abend gekocht wird, dir fehlt aber das perfekte Rezept? Gib ein Schlagwort in unsere Suchleiste ein und sieh dir an, was FSS Cooking dir alles an leckeren Gerichten ausspuckt. Du brauchst eine konkrete Idee für einen festlichen Anlass, Weihnachten oder Ostern steht vor der Tür oder du hast nach deinem letzten Urlaub ständig Lust auf italienische Gerichte? Setze die Filter ganz nach Belieben und lass dich von uns ganz einfach zu deinem neuen Lieblingsrezept leiten.
                    <p> Wir zeigen dir die einfachsten Alltagsgerichte, die besten Rezeptklassiker, leckere Snacks für zwischendurch, aufwändige Wow-Rezepte für das romantische Dinner, trag- und grillbare Gerichte und Beilagen für die Gartenparty oder das neuste aus dem Food-Trend-Himmel – natürlich alles im FSS-Style.
                        Egal wo du suchst, auf jeder Seite, hinter jedem Reiter und unter jedem Link versteckt sich bei uns FSS-Content. </p>
                </div>
            </div>
        </>
    )


}




