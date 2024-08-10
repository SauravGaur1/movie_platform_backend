const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class Admin extends Model {
    static associate(models) {

    }

}

Admin.init(
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
        email: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            limit: 256,
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


module.exports = Admin;