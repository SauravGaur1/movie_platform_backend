require('dotenv').config()

module.exports = { 
    enviornment: {
        active: "dev",
        development: {
            port: 3000,
            host: "127.0.0.1",
        },
        production: {
            port: 80,
            host: "0.0.0.0",
        }
    }
};