import RecipeOverview from "../components/recipeOverview";
import {Link} from "react-router-dom";

export default function Recipes() {
    return (
        <>
            <div>
                <RecipeOverview/>
            </div>
            <div>
                <Link to={`/recipes/new`} className=""> Add new Recipe </Link>
            </div>

            </>
    )
}