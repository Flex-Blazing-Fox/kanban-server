require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = process.env.PORT
const routers = require('./routers')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(routers);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
})