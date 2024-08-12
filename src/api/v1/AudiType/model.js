const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");

class AudiType extends Model {
  static associate(models) {
    AudiType.hasMany(models.Audi,{
      foreignKey:'type'
    });
  }
}

AudiType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Sets the default value to the current timestamp
      onUpdate: DataTypes.NOW, // Updates the timestamp on record update
    },
  },

  {
    timestamps: false,
    sequelize,
  }
);

module.exports = AudiType;
