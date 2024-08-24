const { sendFailureResp } = require("./response")

const asyncHandler = (controller) => {
    return async (req, res, next) => {
        try {
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

module.exports = asyncHandler