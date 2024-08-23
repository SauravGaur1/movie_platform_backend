const { sendSuccessResp, sendFailureResp } = require('../../../utils/response.js');

const { City} = require('../../../database/index.js');

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
}

module.exports = cityController;