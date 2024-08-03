const path = require('path');
const glob = require('glob');
const Sequelize = require('sequelize');
const sequelize = require('./mariaConn.js');
const models = {};

const modelsPath = path.join(__dirname, '../api/v1/**/*.js');  // Adjust the path as necessary

glob.sync(modelsPath).forEach(file => {
  if (file.endsWith('model.js')) {
    try{
        const model = require(path.resolve(file))(sequelize, Sequelize.DataTypes);
        models[model.name] = model;
    } catch {}
  }
});

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { 
  models,
  sequelize
};
