const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Show extends Model {
  static associate(models) {}
}

Show.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    audi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  { sequelize },
);

module.exports = Show;
