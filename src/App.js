import './App.css';
import Recipe from './Recipe';
import React, {useEffect, useState} from "react";
const App = () =>
{
    const APP_ID = "97e81a4f";
    const APP_KEY = "99a2eac2c3890d8a034b2e161709312a";
    
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState("cake");

    useEffect(() =>
    {
        getRecipes();
    }, [query]);

    const getRecipes = async () =>
    {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
    }

    const getSearch = e =>
    {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    }

    return (
        <div className="App">
            <form onSubmit ={ getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={(e) =>{
                    setSearch(e.target.value);
                }  } />
                <button className="search-button" type="submit"> search </button>
            </form>
            <div className="recipes">
            {recipes.map(recipe => (<Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients} />))
                }
                </div>
        </div>
    )
}

export default App;
