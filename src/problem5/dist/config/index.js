"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.env = process.env.NODE_ENV || 'local';
        this.port = Number(process.env.PORT) || Config.defaultConfig.port;
        this.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/product';
    }
}
Config.defaultConfig = {
    host: 'localhost',
    port: 3000,
    protocol: 'http'
};
exports.default = new Config();
