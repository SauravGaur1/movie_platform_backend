const { Model, DataTypes } = require("sequelize");

const {sequelize} = require("../../../database/database.js");

class City extends Model {
    static associate(models) {
        City.belongsTo(models.State, {
            foreignKey: 'state_id'
        })
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
        },
        title: {
            type : DataTypes.STRING,
            allowNull: false
        }, createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },

    {
        timestamps: false, sequelize
    }
)

module.exports = City