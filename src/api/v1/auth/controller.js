const {
    sendSuccessResp,
    sendFailureResp,
} = require('../../../utils/response.js');

module.exports = {
    signup: (req, res) => {
        sendSuccessResp(res,{
            data: {
                message: "Mann Lo Ki User Sign UP ho gya"
            }
        })
    },

    login: (req, res) => {
        sendSuccessResp(res, {
            data: {
                message: "Maan Lo Ki User Login ho Gya",
            }
        })
    }
}