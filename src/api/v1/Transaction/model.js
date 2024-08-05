const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Transaction extends Model {
  static associate(models) {}
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    }
  },
  { sequelize },
);

module.exports = Transaction;