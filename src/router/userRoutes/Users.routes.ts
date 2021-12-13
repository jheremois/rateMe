import { Router } from "express";
import { getUsers, getUser, getMe } from "../../controllers/userControllers/usersControllers";
import verifyToken from "../../middlewares/jwt";
import passport from "passport"; 

const router = Router()

const UserRoutes = ()=>{

    router.get('/users', verifyToken, getUsers)

    router.get('/user/:id', verifyToken, getUser)

    router.get('/user', verifyToken, getMe)

    return router
}

export default UserRoutes