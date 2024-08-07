const path = require('path');
const glob = require('glob');
const { toUnixPath } = require('../utils/sanitize.js');
const models = {};

const {sequelize} = require("./database")
let modelsPath = toUnixPath(path.join(__dirname, '..', 'api', 'v1', '**', 'model.js'));

glob.sync(modelsPath).forEach(file => {
  try{
    const model = require(path.resolve(file));
    models[model.name] = model;
  } catch (error) {
    console.log(error)
  }
});

sequelize.sync({alter: true});

Object.keys(models).forEach(modelName => {

  try {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = { 
  models,
};
