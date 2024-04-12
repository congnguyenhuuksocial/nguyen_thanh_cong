import logger from "./util/logger";
import {App} from "./app";
import config from "./config";

new App().init().then((app) => {
    const server = app.listen(config.port, () => {
        logger.info(`worker ${process.pid} is now running on port ${config.port} in ${config.env}`)
    })
    server.keepAliveTimeout = 65000
}).catch((error) => {
    logger.error("error: ", error)
    process.exit(1)
})
