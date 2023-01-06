const asyncHandler = require('express-async-handler')

const Recipe = require('./model')


const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find()

    res.status(200).json(recipes)
})

const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    res.status(200).json(recipe)
})


const setRecipe = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name field')
    }
    if (!req.body.description) {
        res.status(400)
        throw new Error('Please add a description field')
    }
    if (!req.body.ingredients) {
        res.status(400)
        throw new Error('Please add a ingredients field')
    }

    const recipe = await Recipe.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
    })

    res.status(200).json(recipe)
})


const updateRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    const updateRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateRecipe)
})


const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    await recipe.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getRecipes,
    getRecipe,
    setRecipe,
    updateRecipe,
    deleteRecipe,
}
