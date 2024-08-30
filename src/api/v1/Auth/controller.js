const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { User, Admin } = require("../../../database/index.js");

const { createToken } = require("../../../services/jwt.js");

const { customError } = require('../../../utils/error');
const roleMap = require("../../../config/config.js").getRoleMap();
const tokenMaxAge = require("../../../config/config.js").jsonWebToken.tokenMaxAge;

module.exports = {
    signup: async (req, res) => {

        try {
            const { role, name, mobile, email, password } = req.validatedBody;
            const userExists = await roleMap[role].findUser({
                email,
                mobile
            });

            if (userExists !== -1) {
                throw new customError({
                    message: 'User already exists!',
                    statusCode: 400,
                    payload: { isExist: true }
                })
            }

            const { dataValues: user } = await roleMap[role].createUser({
                name,
                email,
                password,
                mobile
            });

            const token = await generateUserToken(user, role);

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: tokenMaxAge,
            });

            return sendSuccessResp(res, {
                status: 200,
                data: {
                    isExist: false,
                    token,
                    message: "Sign Up Successfully!",
                },
            });
        } catch (err) {
            return sendFailureResp(res, {
                status: err.statusCode,
                data: {
                    message: err.message,
                    ...err.payload
                },
            });
        }
    },

    login: async (req, res) => {
        try {
            const { role, email, password } = req.validatedBody;

            const user = await roleMap[role].findUser({
                email,
                password,
            });

            if (user === -1) {
                throw new customError({
                    message: "User does'nt exists!",
                    statusCode: 400,
                    payload: {
                        isExist: true
                    }
                })
            }
            if (user === 0) {
                throw new customError({
                    message: 'Incorrect Password!',
                    statusCode: 400,
                    payload: {
                        isExist: false,
                    }
                });
            }

            const token = await generateUserToken(user?.dataValues, role);

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: tokenMaxAge,
            });

            return sendSuccessResp(res, {
                data: {
                    isExist: true,
                    id: user.dataValues.id,
                    message: "valid login deatils, Access Provided",
                    token,
                },
            });

        } catch (err) {
            return sendFailureResp(res, {
                status: err.statusCode,
                data: {
                    message: err.message,
                    ...err.payload,
                },
            });
        }
    },
};

async function generateUserToken(dataValues, role) {
    try {
        const { id, name, email } = dataValues;
        const payload = {
            id,
            name,
            email,
            role,
        };
        return await createToken(payload);
    } catch (error) {
        throw new customError({
            message: err.message
        });
    }
}
