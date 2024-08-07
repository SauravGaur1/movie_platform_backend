const config = require('./config/config.js');
const app  = require('./app.js');
require('./database/index.js');
const {sequelize} = require('./database/database.js');

const enviornment = config.enviornment.active === "production"
        ? config.enviornment.production 
        : config.enviornment.development;

const {
    port : PORT,
    host : HOST
} = enviornment;


(async () => {
    await sequelize.sync(/*{alter: true}*/);
    console.log('✔️✔️✔️ Connected With Database');
    app.listen(PORT, HOST , () => {
        console.log(`✔️✔️✔️ server started @: http://${HOST}:${PORT}`);
    });
})()

