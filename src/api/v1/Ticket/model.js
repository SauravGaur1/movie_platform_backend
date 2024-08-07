const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Ticket extends Model {
  static associate(models) {
      Ticket.belongsTo(models.User, {
          foreignKey: 'user_id'
    });
      Ticket.belongsTo(models.Show, {
          foreignKey: 'show_id'
    });
      Ticket.belongsTo(models.Transaction, {
          foreignKey: 'transaction_success'
    });

      // TODO : JSON Constraint
  }
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    show_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    seat_no: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    no_of_viewer: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    transaction_success: {
      type: DataTypes.INTEGER,
    },
    transaction_fail: {
      type: DataTypes.JSON,
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

module.exports = Ticket;