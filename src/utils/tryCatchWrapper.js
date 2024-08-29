const { sendFailureResp } = require("./response")

const tryCatchWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            console.log("asjfkhahkh")
            return await controller(req, res, next)
        } catch (err) {
            return sendFailureResp(res, {
                status: err.statusCode,
                data: {
                    message: err.message,
                    ...err.payload,
                },
            });
        }
    }
}

module.exports = tryCatchWrapper