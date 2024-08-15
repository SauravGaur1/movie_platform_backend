const {sendSuccessResp, sendFailureResp} = require('../../../utils/response.js');

const {State} = require('../../../database/index.js')

stateController = {
    getAllStates :  async (req, res) => {
        let statesList = await State.getAllStates()
        sendSuccessResp(
            res,
            {
                status: 200,
                data: {
                    states:statesList
                }
            }
        )
    }
}

module.exports = stateController;