const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a Recipe name'],
        },
        description: {
            type: String,
            required: [true, 'Please add a Recipe description'],
        },
        ingredients: {
            type: Array,
            items : {
                ingredient:{
                    type: String
                }
            },
            required: [true, 'Please add a ingredient array'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Recipe', recipeSchema)
