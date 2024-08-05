const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js').db.development;

class DataBase {
    connection;
     constructor() {

         this.connection =  new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
             host: dbConfig.host,
             dialect: dbConfig.dialect,
             port: dbConfig.port,
             logging: false,
         });
     }

     connect = async () =>
    {
        try{
            await this.connection.authenticate();
            console.log("Connected to Database");
        } catch (e){
            console.log("Unable To connect to database" + e.message);
        }
    }
}
database = new DataBase();
sequelize = database.connection;

module.exports = {database,sequelize} ;
