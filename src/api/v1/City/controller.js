const { sendSuccessResp, sendFailureResp } = require('../../../utils/response.js');

const { City } = require('../../../database/index.js');
const { isEmpty } = require('../../../utils/validators.js')
const { customError } = require("../../../utils/error");

cityController = {

    getPopularCities :  async (req, res) => {

        try {
            const cities = await City.getPopularCities();
            sendSuccessResp(
                res,
                {
                    status: 200,
                    data: {
                        cities: cities
                    }
                }
            )
        } catch (err) {
            sendFailureResp(
                res,
                {
                    status : err.statusCode,
                    data: {
                        message: err.message,
                    }
                }
            )
        }
    },
    getCitiesByStateId : async (req,res) => {
        try {
            let { state_id } = req.query;

            if(isEmpty(state_id)) {
                throw new  customError({
                    statusCode: 200,
                    message : "Invalid State"
                });
            }

            const cities = await City.getCitiesByStateId(state_id);
            sendSuccessResp(
                res,
                {
                    status: 200,
                    data: {
                        cities : cities
                    }
                }
            )
        } catch (err) {
            sendFailureResp(
                res,
                {
                    status : err.statusCode,
                    data: {
                        message: err.message,
                    }
                }
            )
        }
    },
    searchCity :  async (req, res) => {

        try {
            let { q : query } = req.query;

            if(isEmpty(query)) {
                throw new customError({
                    statusCode: 200,
                    message : "Invalid Search Query"
                });
            }

            const cities = await City.searchCities(query);
            sendSuccessResp(
                res,
                {
                    status: 200,
                    data: {
                        cities: cities,
                    }
                }
            )
        } catch (err) {
            sendFailureResp(
                res,
                {
                    status : err.statusCode,
                    data: {
                        message: err.message,
                    }
                }
            )
        }
    },
    searchCityByLatLong :  async (req, res) => {

        try {
            let { lat : latitude } = req.query;
            let { long : longitude } = req.query;

            if(isEmpty(latitude) || isEmpty(longitude)) {
                throw new customError({
                    statusCode: 200,
                    message : "Invalid Latitude or Longitude"
                });
            }

            const cities = await City.searchCityByLatLong(latitude,longitude);
            sendSuccessResp(
                res,
                {
                    status: 200,
                    data: {
                        cities: cities,
                    }
                }
            )
        } catch (err) {
            sendFailureResp(
                res,
                {
                    status : err.statusCode,
                    data: {
                        message: err.message,
                    }
                }
            )
        }
    },

}

module.exports = cityController;