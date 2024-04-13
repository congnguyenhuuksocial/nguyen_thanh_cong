import cors from 'cors'
import express from 'express'
import helmet from "helmet";
import {loggerMiddleware} from "./middlewares/logger";
import * as mongoose from "mongoose";
import logger from "./util/logger";
import config from "./config";
import v1 from "./routes/v1";

export class App {
    public readonly app: express.Application
    constructor() {
        this.app = express()
    }

    private config(): void {
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use((req, res, next) => {
            express.json({ limit: '10mb' })(req, res, (err) => {
                if (err) {
                    next(new Error('Bad Request'))
                }
                next()
            })
        })
        this.app.use((req, res, next) => {
            express.urlencoded({ extended: false })(req, res, (err) => {
                if (err) {
                    next(new Error('Bad Request'))
                }
                next()
            })
        })
        // this.app.use(loggerMiddleware())

        this.app.use('/v1', v1)

        this.app.get('/healthcheck', (req, res) => {
            res.sendStatus(200)
        })
    }

    private async mongoSetup() {
        logger.info("Connecting to mongo...")
        mongoose.set('strictQuery', true)

        const connectOption = {
            maxPoolSize: 10,
            autoIndex: true,
        }

        try {
            await mongoose.connect(config.mongoUri, connectOption)
        } catch (error) {
            logger.error(`Failed to connect mongo at ${config.mongoUri.replace(/mongodb(\+srv)?:\/\/.*@/gi, '')}`)
            process.exit(1)
        }

        // mongoose.connection.on('error', (error) => {
        //     logger.error(`error: ${error}`)
        // })
    }

    async init(): Promise<express.Application> {
        this.config()
        await this.mongoSetup()
        return this.app
    }
}
