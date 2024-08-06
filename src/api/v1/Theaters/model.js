const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Theaters extends Model {
  static associate(models) {
    models.Admin.hasMany(Theaters, {
      foreignKey: 'admin_id',
    });
    models.City.hasMany(Theaters, {
      foreignKey: 'city_id',
    });
    Theaters.belongsTo(models.Admin);
    Theaters.belongsTo(models.City);
  }
}

Theaters.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
  },
  { sequelize },
);

module.exports = Theaters;