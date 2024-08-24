require("dotenv").config();
const configHandler = require('../utils/configHandler');
const config = new configHandler()

module.exports = {
    enviornment: {
        active: "development",
        development: {
            port: process.env.PORT,
            host: process.env.HOST,
        },
        production: {
            port: 80,
            host: "0.0.0.0",
        },
    },
    encryption: {
        salt: Number(process.env.BCRYPT_SALT),
    },
    db: {
        development: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            dialect: "mariadb",
            dbConnectionTimeout: Number(process.env.DB_CONNECTION_TIMEOUT),
            dbMaxConnection: Number(process.env.DB_MAX_CONNECTION),
            dbMinConnection: Number(process.env.DB_MIN_CONNECTION),
            dbIdleTimeout: Number(process.env.DB_IDLE_TIMEOUT),
            dbAcquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT),
        },
    },
    jsonWebToken: {
        secretKey: process.env.JWT_SECRET,
        tokenMaxAge: 24 * 60 * 60 * 1000,
    },
    getRoleMap: () => {
        const { User, Admin } = require("../database/index.js");
        return {
            0: User,
            1: Admin
        }
    },
    seatCodes: config.getConfig("seatCodes"),
    config
};
