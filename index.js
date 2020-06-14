const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

// Import routes


app.use('/api/posts', require('./routes/posts'))

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected')

)



app.listen(5000, () => {
    console.log("App is up and running on 5000")
})