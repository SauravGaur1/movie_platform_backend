const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Audi extends Model {
  static associate(models) {
    models.AudiType.hasMany(Audi, {
      foreignKey: 'type',
    });
    models.Theaters.hasMany(Audi, {
      foreignKey: 'theater_id',
    });
    Audi.belongsTo(models.AudiType, {
      foreignKey: 'type',
    });
    Audi.belongsTo(models.Theaters, {
      foreignKey: 'theater_id',
    });
  }
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