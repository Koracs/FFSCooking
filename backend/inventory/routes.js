const express = require('express')
const router = express.Router()
const {
    getInventories,
    getInventory,
    setInventory,
    updateInventory,
    deleteInventory,
    invertIngrediantStatus
} = require('./controller')

router.route('/').get(getInventories).post(setInventory)
router.route('/:id').delete(deleteInventory).put(updateInventory).get(getInventory)
router.route('/:id/ingredient/:ingredientid').put(invertIngrediantStatus)

module.exports = router