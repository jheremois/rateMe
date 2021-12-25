"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.getMe = exports.getUser = exports.getUsers = void 0;
const database_1 = require("../../config/database");
const jsonwebtoken_1 = require("jsonwebtoken");
const environments_1 = __importDefault(require("../../config/environments"));
const conf = environments_1.default.passport.JWT;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.pool.query(`
    SELECT s1.user_id, s1.email, s2.user_name, s2.user_description, s2.profile_pic
    FROM users AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id;`, (err, response) => {
        response.length < 1
            ?
                res.status(500).json({
                    status: 500,
                    data: "No user where found"
                })
            :
                err
                    ?
                        res.status(500).json({
                            status: 500,
                            data: err
                        })
                    :
                        res.status(200).json({
                            status: 200,
                            response: response
                        });
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    database_1.pool.query(`
    SELECT s1.user_id, s1.email, s2.user_name, s2.user_description, s2.profile_pic
    FROM users AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.user_id AND s2.user_id = ${id}`, (err, response) => {
        response.length < 1
            ?
                res.status(500).json({
                    status: 500,
                    data: "No user where found"
                })
            :
                err
                    ?
                        res.status(500).json({
                            status: 500,
                            data: err
                        })
                    :
                        res.status(200).json({
                            status: 200,
                            response: response
                        });
    });
});
exports.getUser = getUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["user_token"];
    let jwtPlayload = (0, jsonwebtoken_1.verify)(token, conf.CLIENT_SECRET);
    database_1.pool.query(`
    SELECT s1.user_id, s1.email, s2.user_name, s2.user_description, s2.profile_pic
    FROM users AS s1
    INNER JOIN profiles AS s2
    ON s1.user_id = s2.user_id
    WHERE s1.user_id AND s2.user_id = ${jwtPlayload.user_id}`, (err, response) => {
        response.length < 1
            ?
                res.status(500).json({
                    status: 500,
                    data: "No user where found"
                })
            :
                err
                    ?
                        res.status(500).json({
                            status: 500,
                            data: err
                        })
                    :
                        res.status(200).json({
                            status: 200,
                            response: response
                        });
    });
});
exports.getMe = getMe;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_description, user_name, profile_pic } = req.body;
    const token = req.headers["user_token"];
    let jwtPlayload = (0, jsonwebtoken_1.verify)(token, conf.CLIENT_SECRET);
    user_name && profile_pic
        ?
            user_name.length > 4
                ?
                    database_1.pool.query(`
        UPDATE profiles
        SET user_description= '${user_description || ""}', user_name= '${user_name}', profile_pic= '${profile_pic}'
        WHERE user_id = ${jwtPlayload.user_id}
      `, (err, response) => {
                        response
                            ?
                                res.json(response)
                            :
                                res.json("User name allready selected");
                    })
                :
                    res.json("Name field is failing")
        :
            res.send("Internal error");
});
exports.editUser = editUser;
