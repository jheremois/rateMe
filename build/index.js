"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_routes_1 = __importDefault(require("./router/userRoutes/Auth.routes"));
const environments_1 = __importDefault(require("./config/environments"));
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const Users_routes_1 = __importDefault(require("./router/userRoutes/Users.routes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
dotenv_1.default.config({ path: './.env' });
app.set('port', environments_1.default.app.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
const port = app.get('port');
app.use('/api/', [(0, Auth_routes_1.default)(), (0, Users_routes_1.default)()]);
app.use('/', (req, res) => {
    res.send("Ritme-dev");
});
server.listen(port);
server.on('error', (err) => {
    console.log(err);
});
server.on('listening', () => {
    console.log(`Online on port ${port}`);
});
