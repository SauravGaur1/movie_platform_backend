const config = require('./config/config.js');
const app  = require('./app.js');
const sequelize = require("./database/mariaConn.js");

const enviornment = config.enviornment.active == "production"
        ? config.enviornment.production 
        : config.enviornment.development;

const {
    port : PORT,
    host : HOST
} = enviornment;


(async () => {
    await sequelize.authenticate();
    console.log("DB Connected");
    app.listen(PORT, HOST , ()=> {
        console.log(`server started @: http://${HOST}:${PORT}`);
    });
})()

