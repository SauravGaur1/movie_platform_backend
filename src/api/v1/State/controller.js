const { sendSuccessResp, sendFailureResp } = require('../../../utils/response.js');

const { State , City} = require('../../../database/index.js');

stateController = {
    getAllStates :  async (req, res) => {

        try {
            const states = await State.getAllStates();
            sendSuccessResp(
                res,
                {
                    status: 200,
                    data: {
                        states: states
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
            const states = await City.getCitiesByStateId(req.params['state_id']);
            sendSuccessResp(
                res,
                {
                    status: 200,
                    data: {
                        states: states
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
    }
}

module.exports = stateController;