const {Model, DataTypes} = require("sequelize");

const {sequelize} = require("../../../database/database.js");


class State extends Model {
    static associate(models) {
        State.hasMany(models.City,{
            foreignKey:'state_id'
        });

    }
}

State.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            limit: 256,
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
        timestamps: false
        , sequelize
    }
)


module.exports = State