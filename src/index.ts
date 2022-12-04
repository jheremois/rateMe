import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./router/Auth.routes";
import http from "http"
import 'reflect-metadata'
import passport from "passport";
import cors from "cors";

const app = express()

const server = http.createServer(app);

dotenv.config({path: './.env'})
app.set('port', process.env.PORT || 4000)

const corsOptions = {
	origin: process.env.ALLOW_ORIGIN_DEV,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(passport.initialize())

const port = app.get('port')

app.use('/api/', [AuthRoutes()])
app.use('/', (req: any, res: any)=> {
    res.send("Ritme Auth")
})

server.listen(port);
server.on('error', (err)=>{
    console.log(err)
});

server.on('listening', ()=>{
    console.log(`Online on port ${port}`)
});