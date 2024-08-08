const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Transaction extends Model {
  static associate(models) {
    Transaction.hasOne(models.Ticket,{
      foreignKey:'transaction_success'
    });
  }
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
    }, createdAt: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false
      },
      updatedAt: {
          type: 'TIMESTAMP',
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          allowNull: false
      }
  },

    {
        timestamps: false, sequelize
    },
);

module.exports = Transaction;