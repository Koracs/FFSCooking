const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
    {
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
    }
)

module.exports = mongoose.model('Inventory', inventorySchema)
