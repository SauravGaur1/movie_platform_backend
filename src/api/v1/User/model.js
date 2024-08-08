const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Ticket,{
      foreignKey:'user_id'
    });
  }
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

module.exports = User;
