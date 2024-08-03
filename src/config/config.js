require('dotenv').config()

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
        }
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
            dialect: 'mariadb',
        },
    },
};