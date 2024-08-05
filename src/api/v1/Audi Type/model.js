const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class AudiType extends Model {
    static associate(models) {

    }

}

AudiType.init(
    {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:  true
        },
        title: {
            type : DataTypes.STRING,
            allowNull: false
        },
        short_name: {
            type : DataTypes.STRING,
            allowNull: false
        }
    },
    {sequelize}
)


module.exports = AudiType


