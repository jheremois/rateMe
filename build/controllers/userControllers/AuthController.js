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
exports.login = exports.register = void 0;
const database_1 = require("../../config/database");
const fucntions_1 = require("../../helpers/fucntions");
const jsonwebtoken_1 = require("jsonwebtoken");
const environments_1 = __importDefault(require("../../config/environments"));
const conf = environments_1.default.passport.JWT;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, user_name } = req.body;
    email && password && user_name
        ?
            (0, fucntions_1.passwrdHashing)(password).then((pswrd) => {
                database_1.pool.query('INSERT INTO users SET?', {
                    email,
                    password: pswrd
                }, (err, response) => {
                    err
                        ?
                            res.status(500).json({
                                status: 500,
                                data: err
                            })
                        :
                            database_1.pool.query('INSERT INTO profiles SET?', {
                                user_id: response.insertId,
                                user_name: user_name
                            }, (profileRes) => {
                                res.json({
                                    ProfileRes: profileRes,
                                    UserRes: response,
                                    status: 200,
                                });
                            });
                });
            })
        :
            res.status(500).json({
                status: 500,
                data: "Fields missing"
            });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    email && password
        ? (database_1.pool.query(`
        SELECT *
        FROM users
        INNER JOIN profiles
        ON users.user_id = profiles.user_id
        WHERE users.email = '${email}'
      `, (err, response) => {
            err
                ?
                    res.status(500).json({
                        status: 500,
                        data: err
                    })
                :
                    response[0]
                        ?
                            (0, fucntions_1.passwrdCheck)(res, password, response[0].password).then((validPassword) => {
                                console.log(validPassword);
                                if (validPassword) {
                                    const token = (0, jsonwebtoken_1.sign)({ user_id: response[0].user_id, user_name: response[0].user_name }, conf.CLIENT_SECRET, { expiresIn: "1h" });
                                    console.log(token);
                                    res.status(200).json({
                                        status: 200,
                                        message: "Valid password",
                                        data: {
                                            user_token: token,
                                            user: {
                                                email: response[0].email,
                                                user_id: response[0].user_id,
                                                user_name: response[0].user_name,
                                            }
                                        }
                                    });
                                }
                                else {
                                    res.status(400).json({ error: "Fields invalid" });
                                }
                            })
                        :
                            res.status(400).json({ error: "Fields invalid" });
        }))
        :
            res.status(500).json({
                status: 500,
                data: "Fields missing"
            });
});
exports.login = login;
