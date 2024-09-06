const { Model, DataTypes, Op } = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { isEmpty } = require("../../../utils/validators.js");
const { customError } = require("../../../utils/error.js");

class Theaters extends Model {
    static associate(models) {
        Theaters.belongsTo(models.Admin, {
            foreignKey: "admin_id",
        });

        Theaters.belongsTo(models.City, {
            foreignKey: "city_id",
        });

        Theaters.hasMany(models.Audi, {
            foreignKey: "theater_id",
        });
    }

    static async createTheater({
        admin_id,
        name,
        city_id,
        pincode,
        latitude,
        longitude
    }) {
        try {
            const data = await this.findOne({
                [Op.and]: [{ latitude }, { longitude }, { admin_id }]
            })
            
            if (!isEmpty(data)) {
                throw new customError({ message: "Theater already exists" })
            }

            const { dataValues: theater } = await this.create({
                admin_id,
                name,
                city_id,
                pincode,
                latitude,
                longitude
            })
            return theater

        }
        catch (err) {
            throw new customError({ message: err.message })
        }
    }
}

Theaters.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pincode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
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

module.exports = Theaters;
