const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");

class State extends Model {
    static associate(models) {
        State.hasMany(models.City, {
            foreignKey: "state_id",
        });
    }
}

State.init(
    {
        id: {
            type: DataTypes.MEDIUMINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            limit: 256,
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
        fips_code : {
            type: DataTypes.STRING,
            limit: 256,
        },
        iso2 : {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        type : {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        latitude : {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        longitude : {
            type: DataTypes.DECIMAL,
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

module.exports = State;
