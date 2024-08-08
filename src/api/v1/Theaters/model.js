const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");

class Theaters extends Model {
  static associate(models) {

    Theaters.belongsTo(models.Admin, {
      foreignKey: 'admin_id',
    });

    Theaters.belongsTo(models.City, {
      foreignKey: 'city_id',
    });

    
    Theaters.hasMany(models.Audi,{
      foreignKey:'theater_id'
    });

  }
}

Theaters.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
    },
  },

  {
    timestamps: false,
    sequelize,
  }
);

module.exports = Theaters;
