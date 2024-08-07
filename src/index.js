const config = require('./config/config.js');
const app  = require('./app.js');
const {models} = require('./database/index.js');
const {sequelize} = require('./database/database.js');
const async = require("async");

const enviornment = config.enviornment.active === "production"
        ? config.enviornment.production 
        : config.enviornment.development;

const {
    port : PORT,
    host : HOST
} = enviornment;


(async () => {
    try {
        async.series([
            async ()=> {
                await models.State.sync({alter: true})
            },
            async () => {
                await models.City.sync({alter: true})
            }
        ], (err, data) => {
            console.log(err, data);
        })
    } catch(e) {
        console.log(e);
    }
    
    // await sequelize.sync(/*{alter: true}*/);
    console.log('✔️✔️✔️ Connected With Database');
    app.listen(PORT, HOST , () => {
        console.log(`✔️✔️✔️ server started @: http://${HOST}:${PORT}`);
    });
})()

