const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class Admin extends Model {
    static associate(models) {

    }

}

Admin.init(
    {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:  true
        },
        name: {
            type : DataTypes.STRING,
            limit:256,
            allowNull: false
        },
        email: {
            type : DataTypes.STRING,
            limit:256,
            allowNull: false
        },
        mobile: {
            type : DataTypes.STRING,
            limit:256,
            allowNull: false
        },
        password: {
            type : DataTypes.STRING,
            limit:256,
            allowNull: false
        },
    },
    {sequelize}
)


module.exports = Admin


