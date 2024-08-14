const config = require('./config/config.js');
const app  = require('./app.js');
require('./database/index.js');
require("./services/aws_s3.js");


const enviornment = config.enviornment.active === "production"
        ? config.enviornment.production 
        : config.enviornment.development;

const {
    port : PORT,
    host : HOST
} = enviornment;


(async () => {
    app.listen(PORT, HOST , () => {
        console.log(`✔️✔️✔️ server started @: http://${HOST}:${PORT}`);
    });
})()

