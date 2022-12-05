const asyncHandler = require('express-async-handler')

const Inventory = require('./model')

const getInventory = asyncHandler(async (req, res) => {
    const inventory = await Inventory.find()

    if (!inventory) {
        res.status(400)
        throw new Error('Inventory not found')
    }

    res.status(200).json(inventory)
})

const getIngredient = asyncHandler(async (req, res) => {
    const ingredient = await Inventory.findById(req.params.id)

    if (!ingredient) {
        res.status(400)
        throw new Error('Ingredient not found')
    }

    res.status(200).json(ingredient)
})


const setIngredient = asyncHandler(async (req, res) => {
    if (!req.body.ingredient) {
        res.status(400)
        throw new Error('Please add a ingredient field')
    }
    if (!req.body.state) {
        res.status(400)
        throw new Error('Please add a state field')
    }

    const inventory = await Inventory.create({
        ingredient: req.body.ingredient,
        state: req.body.state,
    })

    res.status(200).json(inventory)
})


const updateIngredient = asyncHandler(async (req, res) => {
    const ingredient = await Inventory.findById(req.params.id)

    if (!ingredient) {
        res.status(400)
        throw new Error('Ingredient not found')
    }

    const updateIngredient = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateIngredient)
})


//todo ansehen
const invertIngredientStatus = asyncHandler(async (req, res) => {
    const ingredient = await Inventory.findById(req.params.id)

    if (!ingredient) {
        res.status(400)
        throw new Error('Ingredient not found')
    }

    ingredient.state = !ingredient.state;

    const updateIngredient = await Inventory.findByIdAndUpdate(req.params.id, ingredient, {
        new: true,
    })

    res.status(200).json(updateIngredient)
})


const deleteIngredient = asyncHandler(async (req, res) => {
    const ingredient = await Inventory.findById(req.params.id)

    if (!ingredient) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    await ingredient.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getInventory: getInventory,
    getIngredient: getIngredient,
    setIngredient: setIngredient,
    updateIngredient: updateIngredient,
    deleteIngredient: deleteIngredient,
    invertIngredientStatus: invertIngredientStatus
}