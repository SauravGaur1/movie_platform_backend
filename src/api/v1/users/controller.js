const {sendSuccessResp, sendFailureResp} = require('../../../utils/response.js');

module.exports = {
    getUserById: (req, res) => {
        sendSuccessResp(res, {
            data: {
                message: "Mann Lo Ki User Ka Data Mil Gya"
            }
        })
    },

    updateUserById: (req, res) => {
        sendSuccessResp(res, {
            data: {
                message: "Maan Lo Ki User Update ho Gya",
            }
        })
    }
}