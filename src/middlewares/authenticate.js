const { sendFailureResp, sendSuccessResp } = require("../utils/response");
const JWT = require("../services/jwt.js");
const { customError } = require("../utils/error.js");
const { sanitizeToken } = require("../utils/sanitize.js");
const { isEmpty } = require("../utils/validators.js");

module.exports = {
    authenticate:
        (role = 0) =>
        async (req, res, next) => {
            try {
                //req.cookies.token because of app.use(cookieParser()) in app.js;
                const token = req.cookies.token;

                if (isEmpty(token)) {
                    throw new customError({
                        message: "Token not Found!",
                        statusCode: 404,
                    });
                }
                const decoded = await JWT.verifyToken(token);
                if (isEmpty(decoded)) {
                    throw new customError({
                        message: "Invalid or Expired Token!",
                        statusCode: 401,
                    });
                }
                if (decoded.role != role) {
                    throw new customError({
                        message: "Invalid Role!",
                        statusCode: 401,
                    });
                }
                req.User = decoded;
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
