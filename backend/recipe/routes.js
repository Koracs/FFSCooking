const express = require('express')
const router = express.Router()
const {
    getRecipes,
    getRecipe,
    setRecipe,
    updateRecipe,
    deleteRecipe,
} = require('./recipeController')

router.route('/').get(getRecipes).post(setRecipe)
router.route('/:id').delete(deleteRecipe).put(updateRecipe).get(getRecipe)

module.exports = router