class Config {
    static readonly defaultConfig = {
        host: 'localhost',
        port: Number(process.env.PORT) || 3000,
        protocol: 'http'
    };

    env: string;
    port: number;
    mongoUri: string;

    constructor() {
        this.env = process.env.NODE_ENV || 'local';
        this.port = Number(process.env.PORT) || Config.defaultConfig.port;
        this.mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/product';
    }
}

export default new Config();
