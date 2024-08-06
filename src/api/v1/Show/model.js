const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Show extends Model {
  static associate(models) {
    models.Audi.hasMany(Show, {
      foreignKey: 'audi_id',
    });
    models.Movie.hasMany(Show, {
      foreignKey: 'movie_id',
    });
    models.Language.hasMany(Show, {
      foreignKey: 'language_id',
    });
    Show.belongsTo(models.Audi);
    Show.belongsTo(models.Movie);
    Show.belongsTo(models.Language);
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
    }
  },
  { sequelize },
);

module.exports = Show;