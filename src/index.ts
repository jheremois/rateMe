import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./router/userRoutes/Auth.routes";
import appConfig from "./config/environments";
import http from "http"
import 'reflect-metadata'
import UserRoutes from "./router/userRoutes/Users.routes";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";
import cors from "cors";

const app = express()

const server = http.createServer(app);

dotenv.config({path: './.env'})
app.set('port', appConfig.app.PORT)
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)


const port = app.get('port')

app.use('/api/', [AuthRoutes(), UserRoutes()])

server.listen(port);
server.on('error', (err)=>{
    console.log(err)
});

server.on('listening', ()=>{
    console.log(`Online on port ${port}`)
});