const { sendSuccessResp, sendFailureResp } = require('../../../utils/response.js');

const { State } = require('../../../database/index.js');

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
                    status : err.stausCode,
                    data: {
                        message: err.message,
                    }
                }
            )
        }
    }
}

module.exports = stateController;