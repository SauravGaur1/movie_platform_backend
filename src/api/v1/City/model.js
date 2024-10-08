const { Model, DataTypes, where} = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { Op } = require("sequelize");
const redisClient = require("../../../services/redis.js");
const { isEmpty } = require("../../../utils/validators.js");

class City extends Model {
    static associate(models) {
        City.belongsTo(models.State, {
            foreignKey: "state_id",
        });

        City.hasMany(models.Theaters, {
            foreignKey: "city_id",
        });
    }

    static async getCitiesByStateId(state_id) {
        try {
            const cities = await City.findAll(
                {
                    attributes:[ "id" , "name" ],
                    order: [
                        ["name"]
                    ],
                    where: {
                        state_id :  {
                            [Op.eq]: state_id
                        }
                    }
                }
            );

            return cities;
        } catch (e) {
            throw e;
        }
    }

    static async getPopularCities() {
        
        try {

            let cities = await redisClient.get({
                key: "cities:popular"
            });

            if(isEmpty(cities)) {
                cities = await City.findAll(
                    {
                        attributes:[ "id" , "name", ],
                        order: [
                            ["name"]
                        ],
                        where: {
                            is_popular :  {
                                [Op.eq]: true
                            }
                        }
                    }
                );
                await redisClient.set({
                    key: "cities:popular",
                    value: JSON.stringify(cities),
                })
            } else {
                cities = JSON.parse(cities);
            }

            return cities;

        } catch (e) {
            throw e;
        }
    }

    static async searchCities(query) {
        try {
            const cities = await City.findAll(
                {
                    attributes:[ "id" , "name", ],
                    order: [
                        ["name"]
                    ],
                    where: {
                        name :  {
                            [Op.like]: `%${query}%`
                        }
                    }
                }
            );

            return cities;
        } catch (e) {
            throw e;
        }
    }

    static async searchCityByLatLong(lat,long) {
        try {
            // 0.009 is equal to 1KM
            let searchParameter = 10 * 0.009;

            lat = parseFloat(lat);
            long = parseFloat(long);

            const cities = await City.findAll(
                {
                    attributes:[ "id" , "name", ],
                    order: [
                        ["latitude"]
                    ],
                    where: {
                        latitude :  {
                            [Op.between]: [lat - searchParameter,lat + searchParameter]
                        },
                        longitude :  {
                            [Op.between]: [long - searchParameter,long + searchParameter]
                        },
                    }
                }
            );

            return cities;
        } catch (e) {
            throw e;
        }
    }
}

City.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        state_id : {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
        },
        state_code : {
            type: DataTypes.CHAR,
            limit: 2,
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
        latitude : {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
        },
        longitude : {
            type: DataTypes.DECIMAL(10,8),
            allowNull: false,
        },
        is_popular : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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

module.exports = City;
