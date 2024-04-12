"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const os = __importStar(require("os"));
morgan_1.default.token('hostname', () => os.hostname());
morgan_1.default.token('pid', () => process.pid.toString());
const jsonFormat = (tokens, req, res) => {
    const body = tokens['body'](req, res);
    if (body.password) {
        delete body.password;
    }
    return JSON.stringify({
        remoteAddress: tokens['remote-addr'](req, res),
        method: tokens['method'](req, res),
        url: tokens['url'](req, res),
        httpVersion: tokens['http-version'](req, res),
        statusCode: tokens['status'](req, res),
        responseTime: tokens['response-time'](req, res),
        referrer: tokens['referrer'](req, res),
        userAgent: tokens['user-agent'](req, res),
        hostname: tokens['hostname'](req, res),
        pid: tokens['pid'](req, res),
    });
};
function loggerMiddleware() {
    return (0, morgan_1.default)(jsonFormat);
}
exports.loggerMiddleware = loggerMiddleware;
