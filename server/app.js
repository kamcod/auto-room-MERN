require('dotenv').config()
const express = require('express')
const app = express();
const connectDB = require('./db/connect');

const port = process.env.PORT || 5000;

const start = async () =>{
     await connectDB(process.env.MONGO_URI)
    console.log("DB is connected!")
    app.listen(port, () => {
        console.log(` server is listening at http://localhost:${port}`)
    })
}

start()
