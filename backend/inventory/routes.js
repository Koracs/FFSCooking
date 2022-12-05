const express = require('express')
const router = express.Router()
const {
    getInventory,
    getIngredient,
    setIngredient,
    updateIngredient,
    deleteIngredient,
    invertIngredientStatus
} = require('./controller')

router.route('/').get(getInventory).post(setIngredient)
router.route('/:id').delete(deleteIngredient).put(updateIngredient).get(getIngredient)
router.route('/:id/invert').put(invertIngredientStatus)

module.exports = router