const {sendSuccessResp,sendFailureResp } = require('../../../utils/response.js');

const {State} = require('../../../database/index.js')

stateController = {
    getAllStates :  async (req, res) => {

        State.getAllStates().then(
        (states) => sendSuccessResp(
            res,
            {
                status: 200,
                data: {
                    states: states
                }
            }
        )).catch((err) => {
            sendFailureResp(
                res,
                {
                    status : 200,
                    data: {
                        message: err,
                    }
                }
            )
        });

    }
}

module.exports = stateController;