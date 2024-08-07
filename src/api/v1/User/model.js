const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class User extends Model {
  static associate(models) {}
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mobile_no: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { sequelize },
);

module.exports = User;
