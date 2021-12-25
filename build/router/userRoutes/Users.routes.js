"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../../controllers/userControllers/usersControllers");
const jwt_1 = __importDefault(require("../../middlewares/jwt"));
const router = (0, express_1.Router)();
const UserRoutes = () => {
    router.get('/users', jwt_1.default, usersControllers_1.getUsers);
    router.get('/user/:id', jwt_1.default, usersControllers_1.getUser);
    router.get('/user', jwt_1.default, usersControllers_1.getMe);
    router.patch('/user', jwt_1.default, usersControllers_1.editUser);
    return router;
};
exports.default = UserRoutes;
