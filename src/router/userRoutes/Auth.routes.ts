import { Router } from "express";
import { register, login } from "../../controllers/userControllers/authController";

const router = Router()

const AuthRoutes = ()=>{

    router.get('/', (req, res)=>{
        res.send("wyd")
    })

    router.post('/register', register)

    router.post('/login', login)

    return router
}

export default AuthRoutes