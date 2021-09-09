import express from "express";
import dotenv from "dotenv";

const app = express()

dotenv.config({path: './.env'})

app.set('port', process.env.PORT || 3000)

const port = app.get('port')

app.use('/', (req, res)=>{
    res.send(`${process.env.MENSAJE}`)
})

app.listen(port, ()=>{
    console.log(`Online on port ${port}`)
})