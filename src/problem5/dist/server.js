"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./util/logger"));
const app_1 = require("./app");
const config_1 = __importDefault(require("./config"));
new app_1.App().init().then((app) => {
    const server = app.listen(config_1.default.port, () => {
        logger_1.default.info(`worker ${process.pid} is now running on port ${config_1.default.port} in ${config_1.default.env}`);
    });
    server.keepAliveTimeout = 65000;
}).catch((error) => {
    logger_1.default.error("error: ", error);
    process.exit(1);
});
