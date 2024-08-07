const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Show extends Model {
  static associate(models) {

      Show.belongsTo(models.Audi, {
          foreignKey: 'audi_id',
    });

      Show.belongsTo(models.Movie, {
          foreignKey: 'movie_id'
    });
      Show.belongsTo(models.Language, {
          foreignKey: 'language_id'
    });
  }
}

Show.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    audi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language_id: {
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

module.exports = Show;