const { Model, DataTypes, Op } = require("sequelize");
const { customError } = require('../../../utils/error');
const { sequelize } = require("../../../database/database.js");
const { isEmpty } = require("../../../utils/validators.js");

class AudiType extends Model {
  static associate(models) {
    AudiType.hasMany(models.Audi, {
      foreignKey: 'type'
    });
  }

  static async createAudiType({ title, short_name }) {
    try {
      const data = await this.findOne({
        where: {
          title,
        },
      });

      if (!isEmpty(data)) {
        throw new customError({ message: "AudiType already exists" })
      }

      const audiType = await this.create({
        title, short_name
      })

      return audiType;
    } catch (err) {
      throw new customError({ message: err.message });
    }
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
