const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");

class City extends Model {
    static associate(models) {
        City.belongsTo(models.State, {
            foreignKey: "state_id",
        });

        City.hasMany(models.Theaters, {
            foreignKey: "city_id",
        });
    }
}

City.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
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

module.exports = City;
