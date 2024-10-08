const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { isEmpty } = require("../../../utils/validators.js");
const { customError } = require("../../../utils/error.js");

class State extends Model {
    static associate(models) {
        State.hasMany(models.City, {
            foreignKey: "state_id",
        });
    }

     static async getAllStates() {

        try {
            const states = await State.findAll(
                {
                    attributes: ['id', 'name'],
                    order: [['name']]
                },
            );

            if(isEmpty(states)) throw new customError({
                statusCode: 200,
                message: "Not able to fetch states",
            })

            return states;

        } catch (e) {
            throw e;
        }

     }
}

State.init(
    {
        id: {
            type: DataTypes.MEDIUMINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        country_id : {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
        },
        country_code : {
            type: DataTypes.CHAR,
            limit: 2,
            allowNull: false,
        },
        fips_code : {
            type: DataTypes.STRING,
            limit: 256,
        },
        iso2 : {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        type : {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        latitude : {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
        },
        longitude : {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
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

module.exports = State;
