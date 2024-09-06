const path = require('path');
const glob = require('glob');
const { toUnixPath } = require('../utils/sanitize.js');
const models = {};
const async = require("async");

let modelsPath = toUnixPath(path.join(__dirname, '..', 'api', 'v1', '**', 'model.js'));

glob.sync(modelsPath).forEach(file => {
  try{
    const model = require(path.resolve(file));
    models[model.name] = model;
  } catch (error) {
    console.log(error)
  }
});

const {
  State,
  City,
  Admin,
  Theaters,
  AudiType,
  Audi,
  Certification,
  Genre,
  Language,
  Movie,
  Show,
  Transaction,
  User,
  Ticket,
  Seat
} = models;

let tableSyncSequence = [
  State,
  City,
  Admin,
  Theaters,
  AudiType,
  Audi,
  Certification,
  Genre,
  Language,
  Movie,
  Show,
  Transaction,
  User,
  Ticket,
  Seat
]

tableSyncSequenceFunction = tableSyncSequence.map((model) => {
  return async () => {
    await model.sync({/*alter: true*/})
  };
})

try {
  async.series(tableSyncSequenceFunction, (err, data) => {
    // console.log(err, data);
  })
} catch (e) {
  console.log(e);
}

Object.keys(models).forEach(modelName => {
  try {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = models;