const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Movie extends Model {
  static associate(models) {
    models.Certification.hasMany(Movie, {
      foreignKey: 'certification_type',
    });
    Movie.belongsTo(models.Certification);
  }
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    thumbnail_portrait: {
      type: DataTypes.JSON,
    },
    thumbnail_landscape: {
      type: DataTypes.JSON,
    },
    lang: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    lang: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    trailer: {
        type: DataTypes.TEXT
    },
    genre: {
        type: DataTypes.JSON
    },
    rating: {
        type: DataTypes.INTEGER
    },
    certification_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING
    },
    cast: {
        type: DataTypes.JSON
    },
    release: {
        type: DataTypes.DATE,
        allowNull: false
    },
  },
  {
    sequelize
  },
);

module.exports = Movie