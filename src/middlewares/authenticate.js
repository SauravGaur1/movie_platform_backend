const { sendFailureResp, sendSuccessResp } = require("../utils/response");
const JWT = require("../services/jwt.js");
const { customError } = require("../utils/error.js");
const { sanitizeToken } = require("../utils/sanitize.js");
const { isEmpty } = require("../utils/validators.js");

module.exports = {
    authenticate: () => async (req, res, next) => {
        console.log("inside authenticate");
        try {
          //req.cookies.token because of app.use(cookieParser()) in app.js;
            const token = req.cookies.token;
            if (isEmpty(token)) {
                throw new customError({
                    message: "Token not Found!",
                    statusCode: 404,
                });
            }
            const decodedPayload = await JWT.verifyToken(token);
            if (isEmpty(decodedPayload)) {
                throw new customError({
                    message: "Invalid or Expired Token!",
                    statusCode: 401,
                });
            }
            req.User = decodedPayload;
            next();
        } catch (error) {
            return sendFailureResp(res, {
                status: error.statusCode,
                data: {
                    message: error.message,
                    ...error.payload,
                },
            });
        }
    },
};
