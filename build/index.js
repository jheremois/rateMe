"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_routes_1 = __importDefault(require("./router/userRoutes/Auth.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: './.env' });
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
app.use('/auth', (0, Auth_routes_1.default)());
app.listen(port, () => {
    console.log(`Online on port ${port}`);
});
