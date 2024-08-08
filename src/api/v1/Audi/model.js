const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Audi extends Model {
  static associate(models) {
   
    Audi.belongsTo(models.AudiType, {
      foreignKey: 'type', 
      
    });

    Audi.belongsTo(models.Theaters, {
      foreignKey: 'theater_id',
    });

    Audi.hasMany(models.Show,{
      foreignKey:'audi_id'
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
    createdAt: {
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

module.exports = Audi;