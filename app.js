require('dotenv').config()
const express = require('express');
const router = require('./routers');
const PORT = 3000
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(PORT,()=>{
    console.log(`listen to port : ${PORT}`);
})