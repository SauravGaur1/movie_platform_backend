const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");


class State extends Model {
    static associate(models) {

    }
}

State.init(
    {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:  true
        },
        title: {
            type : DataTypes.STRING,
            limit: 256,
            allowNull: false
        }
    },
    {sequelize}
)


module.exports = State