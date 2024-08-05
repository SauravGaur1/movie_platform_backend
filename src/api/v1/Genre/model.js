const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class Genre extends Model {
    static associate(models) {

    }

}

Genre.init(
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
    },
    {sequelize}
)


module.exports = Genre


