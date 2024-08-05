const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class City extends Model {
    static associate(models) {

    }

}

City.init(
    {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:  true
        },
        state_id: {
            type : DataTypes.INTEGER,
            allowNull: false,
            foreignKey: 'state_id',
        },
        title: {
            type : DataTypes.STRING,
            allowNull: false
        }
    },
    {sequelize}
)

module.exports = City