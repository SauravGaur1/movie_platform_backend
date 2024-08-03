const express = require("express");
const {Router} = require("express");

const app = express();
const appRouter = Router();

const config = require('./config/config.js');
const apiRouter = require('./api/router.js');

app.use(express.json());
app.use(express.static('public'));
  
appRouter.use(apiRouter);
appRouter.use('*', (req, res) => {
    res.send("404 PAGE");
})

app.use('/', appRouter);

module.exports = app;