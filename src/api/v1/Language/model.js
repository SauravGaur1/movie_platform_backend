const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class Language extends Model {
    static associate(models) {

    }

}

Language.init(
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
        icon: {
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


module.exports = Language


