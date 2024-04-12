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
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose = __importStar(require("mongoose"));
const logger_1 = __importDefault(require("./util/logger"));
const config_1 = __importDefault(require("./config"));
const v1_1 = __importDefault(require("./routes/v1"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
    }
    config() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((req, res, next) => {
            express_1.default.json({ limit: '10mb' })(req, res, (err) => {
                if (err) {
                    next(new Error('Bad Request'));
                }
                next();
            });
        });
        this.app.use((req, res, next) => {
            express_1.default.urlencoded({ extended: false })(req, res, (err) => {
                if (err) {
                    next(new Error('Bad Request'));
                }
                next();
            });
        });
        // this.app.use(loggerMiddleware())
        this.app.use('/v1', v1_1.default);
        this.app.get('/healthcheck', (req, res) => {
            res.sendStatus(200);
        });
    }
    mongoSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.set('strictQuery', true);
            const connectOption = {
                maxPoolSize: 10,
                autoIndex: process.env.NODE_ENV !== 'production',
            };
            try {
                yield mongoose.connect(config_1.default.mongoUri, connectOption);
            }
            catch (error) {
                logger_1.default.error(`Failed to connect mongo at ${config_1.default.mongoUri.replace(/mongodb(\+srv)?:\/\/.*@/gi, '')}`);
                process.exit(1);
            }
            mongoose.connection.on('error', (error) => {
                logger_1.default.error(`error: ${error}`);
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.config();
            // await this.mongoSetup()
            return this.app;
        });
    }
}
exports.App = App;
