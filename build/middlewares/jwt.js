"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const environments_1 = __importDefault(require("../config/environments"));
const conf = environments_1.default.passport.JWT;
const verifyToken = (req, res, next) => {
    const token = req.headers["user_token"];
    let jwtPlayload;
    console.log("res->", req.headers);
    if (!token) {
        return res.status(403).send("User is not autenticated!");
    }
    try {
        jwtPlayload = (0, jsonwebtoken_1.verify)(token, conf.CLIENT_SECRET);
        res.locals.jwtPlayload = jwtPlayload;
    }
    catch (err) {
        return res.status(401).send("Error trying to autenticate");
    }
    const { user_id, username } = jwtPlayload;
    const newToken = (0, jsonwebtoken_1.sign)({ user_id, username }, conf.CLIENT_SECRET, { expiresIn: "1h" });
    res.setHeader("token", newToken);
    return next();
};
exports.default = verifyToken;
