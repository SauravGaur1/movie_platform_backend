const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class Certification extends Model {
    static associate(models) {

    }

}

Certification.init(
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


module.exports = Certification


