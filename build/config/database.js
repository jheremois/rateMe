"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConection = exports.pool = void 0;
const mysql2_1 = require("mysql2");
const environments_1 = __importDefault(require("./environments"));
exports.pool = (0, mysql2_1.createPool)({
    port: environments_1.default.db.PORT,
    host: environments_1.default.db.HOST,
    user: environments_1.default.db.USER,
    password: environments_1.default.db.PASSWORD,
    database: environments_1.default.db.DATABASE,
    waitForConnections: true,
});
exports.dbConection = (0, mysql2_1.createConnection)({
    port: environments_1.default.db.PORT,
    host: environments_1.default.db.HOST,
    user: environments_1.default.db.USER,
    password: environments_1.default.db.PASSWORD,
    database: environments_1.default.db.DATABASE,
    waitForConnections: true,
});
/*
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    
    port: appConfig.db.PORT,
    host: appConfig.db.HOST,
    user: appConfig.db.USER,
    password: appConfig.db.PASSWORD,
    database: appConfig.db.DATABASE,

    DB_PORT: 3308,
    DB_HOST: "127.0.0.1",
    DB_USER: "root",
    DB_PASSWORD: "",
    DATABASE: 'de_shuni',
    
    port:               3308,
    host:               "127.0.0.1",
    user:               "root",
    password:           "",
    database:           "de_shuni",
    waitForConnections: true,
*/ 
