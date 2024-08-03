const config = require('./config/config.js');
const app  = require('./app.js');

const enviornment = config.enviornment.active == "dev"
        ? config.enviornment.development 
        : config.enviornment.production;

const {
    port : PORT,
    host : HOST
} = enviornment;

app.listen(PORT, HOST , ()=> {
    console.log(`server started @: http://${HOST}:${PORT}`);
});