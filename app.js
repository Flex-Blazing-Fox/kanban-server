require('dotenv').config()
const express = require('express');
const router = require('./routers');
const PORT = 3000
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(PORT,()=>{
    console.log(`listen to port : ${PORT}`);
})