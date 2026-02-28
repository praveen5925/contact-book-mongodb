require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

const contactRoutes = require('./routes/contactRoutes')
app.use('/api/contacts', contactRoutes)

app.listen(5000, ()=> console.log("Server running on port 5000"))