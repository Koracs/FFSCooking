const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./db')
const cors = require("cors")
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/recipes', require('./recipeRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))