const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js').db.development;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false,
});

module.exports = sequelize;
