import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router()

const AuthRoutes = ()=>{

    router.post('/register', register)

    router.post('/login', login)

    return router
}

export default AuthRoutes