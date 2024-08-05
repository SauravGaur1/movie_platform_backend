const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Audi extends Model {
  static associate(models) {}
}

Audi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    no_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    layout: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize },
);

module.exports = Audi;