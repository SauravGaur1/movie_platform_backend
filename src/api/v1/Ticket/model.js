const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Ticket extends Model {
  static associate(models) {
    models.User.hasMany(Ticket, {
      foreignKey: 'user_id',
    });
    models.Show.hasOne(Ticket, {
      foreignKey: 'show_id',
    });
    models.Transaction.hasOne(Ticket, {
      foreignKey: 'transaction_success',
    });
    Ticket.belongsTo(models.User);
    Ticket.belongsTo(models.Show);
    Ticket.belongsTo(models.Transaction);
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
    }
  },
  { sequelize },
);

module.exports = Ticket;