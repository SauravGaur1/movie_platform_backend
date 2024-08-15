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
        name: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        state_id : {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
        },
        state_code : {
            type: DataTypes.CHAR,
            limit: 2,
            allowNull: false,
        },
        country_id : {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
        },
        country_code : {
            type: DataTypes.CHAR,
            limit: 2,
            allowNull: false,
        },
        latitude : {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
        },
        longitude : {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
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
