import React from 'react';
import './components/styles.css';
import Header from "./components/header";
import {Route, Routes } from "react-router-dom"
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import Inventory from "./pages/inventory/inventory";
import ViewRecipe from "./pages/viewRecipe";
import AddRecipe from "./pages/addRecipe";
import EditRecipe from "./pages/editRecipe";

function App() {
  return (
      <>
        <Header/>
          <div className="container">
              <Routes>
                  <Route path="/" element = {<Home/>}/>
                  <Route path="/recipes" >
                      <Route index element = {<Recipes />}/>
                      <Route path=":id" element = {<ViewRecipe />}/>
                      <Route path="new" element = {<AddRecipe />}/>
                      <Route path="edit/:id" element = {<EditRecipe />}/>
                  </Route>
                  <Route path="/inventory" element = {<Inventory/>}/>
                  <Route path="*" element = {<Home/>}/>
              </Routes>
          </div>
      </>
  );
}

export default App;
