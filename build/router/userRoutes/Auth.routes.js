"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/userControllers/authController");
const router = (0, express_1.Router)();
const AuthRoutes = () => {
    router.get('/', (req, res) => {
        res.send("wyd");
    });
    router.post('/register', authController_1.register);
    router.post('/login', authController_1.login);
    return router;
};
exports.default = AuthRoutes;
