const asyncHandler = require('express-async-handler')

const Inventory = require('./model')
const mongoose = require('mongoose')

const getInventories = asyncHandler(async (req, res) => {
    const inventories = await Inventory.find()

    res.status(200).json(inventories)
})

const getInventory = asyncHandler(async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)

    if (!inventory) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    console.log(inventory)

    res.status(200).json(inventory)
})

//not complete -> structure: final URI: inventory/id/ingredients
const getIngredients= asyncHandler(async (req, res) => {

    res.status(200).body("URI: inventory/id/ingredients")
})

//not complete -> structure: final URI: inventory/id/ingredient/id
const getIngredient= asyncHandler(async (req, res) => {
    const inventory = await Inventory.findOne({'_id':req.params.id,'ingredients._id': req.params.ingredientid})
    //const inventory = await Inventory.findOne({'ingredients._id': mongoose.Types.ObjectId(req.params.ingredientid)})


    if (!inventory) {
        res.status(400)
        throw new Error('Inventory not found')
    }


    //ProductModel.findOneAndUpdate({"products.productCode": userData.productCode}, {$set: {"products.$": dataToBeUpdated}})
    //ProductModel.findOneAndUpdate({'_id':req.params.id,'ingredients._id': req.params.ingredientid}, {$set: {"products.$": dataToBeUpdated}})
    const updateInventory = await Inventory.findOneAndUpdate({'_id':req.params.id,'ingredients._id': req.params.ingredientid}, {$set: inventory}, {new: true})

    res.status(200).json(inventory)
})


const setInventory = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name field')
    }
    console.log(req.body)
    if (!req.body.ingredients) {
        res.status(400)
        throw new Error('Please add a ingredients field')
    }

    const inventory = await Inventory.create({
        name: req.body.name,
        ingredients: req.body.ingredients,
    })

    res.status(200).json(inventory)
})


const updateInventory = asyncHandler(async (req, res) => {
    const inventory = await Inventory.findById(req.params.id)

    if (!inventory) {
        res.status(400)
        throw new Error('Inventory not found')
    }

    console.log(inventory)
    const updateInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateInventory)
})



const invertIngrediantStatus = asyncHandler(async (req, res) => {
    const inventory = await Inventory.findOne({'_id':req.params.id,'ingredients._id': req.params.ingredientid})
    //const inventory = await Inventory.findOne({'ingredients._id': mongoose.Types.ObjectId(req.params.ingredientid)})


    if (!inventory) {
        res.status(400)
        throw new Error('Inventory not found')
    }

    console.log(inventory.ingredients[0]._id)
    for (const inventoryKey in inventory.ingredients) {
        console.log(inventory.ingredients[inventoryKey].id)
        console.log(inventory.ingredients[inventoryKey].state)
        if(inventory.ingredients[inventoryKey].id === req.params.ingredientid){
            inventory.ingredients[inventoryKey].state = !inventory.ingredients[inventoryKey].state
            break
        }

        console.log(inventory.ingredients[inventoryKey].state)
    }

    //ProductModel.findOneAndUpdate({"products.productCode": userData.productCode}, {$set: {"products.$": dataToBeUpdated}})
    //ProductModel.findOneAndUpdate({'_id':req.params.id,'ingredients._id': req.params.ingredientid}, {$set: {"products.$": dataToBeUpdated}})
    const updateInventory = await Inventory.findOneAndUpdate({'_id':req.params.id,'ingredients._id': req.params.ingredientid}, {$set: inventory}, {new: true})

    res.status(200).json(updateInventory)
})


const deleteInventory = asyncHandler(async (req, res) => {
    const recipe = await Inventory.findById(req.params.id)

    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    await recipe.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getInventories,
    getInventory,
    getIngredient,
    getIngredients,
    setInventory,
    updateInventory,
    invertIngrediantStatus,
    deleteInventory,
}
