const mongoose = require('mongoose')

const ingredient = mongoose.Schema({
        ingredient: {
            type: String,
            require: [true, 'Please add a name for the ingredient!']
        },
        state: {
            type: Boolean,
            require: [true, 'Please add a state!']
        },
    },
    {
        timestamps: true,
    })

const inventorySchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add an inventory name'],
        },
        ingredients: [ingredient]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Inventory', inventorySchema)
