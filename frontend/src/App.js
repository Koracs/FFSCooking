import React from 'react';
import './styles.css';
import Header from "./components/header";
import Footer from "./components/footer";
import {Route, Routes } from "react-router-dom"
import Home from "./pages/home";
import Recipes from "./pages/recipes/recipes";
import Inventory from "./pages/inventory/inventory";
import ViewRecipe from "./pages/recipes/viewRecipe";
import AddRecipe from "./pages/recipes/addRecipe";
import EditRecipe from "./pages/recipes/editRecipe";
import EditInventory from "./pages/inventory/editInventory";

function App() {
  return (
      <>
          <Header/>
          <div className="box container">
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
          <Footer/>
      </>
  );
}

export default App;
