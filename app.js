if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const app = express()
const PORT = 3000 || process.env.PORT
const routers = require('./routers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
