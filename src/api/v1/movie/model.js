const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../../../database/database.js');

class Movie extends Model {
  static associate(models) {
      Movie.belongsTo(models.Certification, {
          foreignKey: 'certification_type',
    });
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
        timestamps: false,
    sequelize
  },
);

module.exports = Movie