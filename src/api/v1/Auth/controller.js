const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { models } = require("../../../database/index.js");
const { User, Admin } = models;

const { createToken } = require("../../../services/jwt.js");

const { compareHash } = require("../../../services/encryption.js");
const { valid } = require("joi");
const { isEmail, isPlainObject } = require("../../../utils/validators.js");
const { toLowerCase } = require("../../../utils/sanitize.js");

const roleArray = [User, Admin];

module.exports = {
    signup: async (req, res) => {
        const { role, name, mobile, email, password } = req.body;

        if (!isEmail(email)) {
            sendFailureResp(res, {
                status: 400,
                data: {
                    message: "Email is not valid",
                },
            });
        }

        email = toLowerCase(email);

        try {
            const userExists = await roleArray[role].findUser(
                email,
                "",
                mobile
            );

            if (userExists !== -1) {
                return sendFailureResp(res, {
                    status: 400,
                    data: {
                        isExist: true,
                        message: "User already exists",
                    },
                });
            }

            const user = await roleArray[role].createUser(
                name,
                email,
                password,
                mobile
            );

            // console.log(user);
            const token = await generateUserToken(user?.dataValues, role);

            res.cookie("JWTToken", token, {
                httpOnly: true, // Helps prevent XSS attacks
                maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 1 day)
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
            console.log(err);
            return sendFailureResp(res, {
                status: 500,
                data: {
                    message: "Something went wrong!",
                    err,
                },
            });
        }
    },

    login: async (req, res) => {
        try {
            const { role, email, password } = req.body;

            if (!isEmail(email)) {
                sendFailureResp(res, {
                    status: 400,
                    data: {
                        message: "Email is not valid",
                    },
                });
            }

            email = toLowerCase(email);

            let dummyMobile = 0;

            const user = await roleArray[role].findUser(
                email,
                password,
                dummyMobile
            );

            if (user === -1) {
                return sendFailureResp(res, {
                    data: {
                        isExist: false,
                        message: "User not found",
                    },
                });
            }
            if (user === 0) {
                return sendFailureResp(res, {
                    data: {
                        isExist: false, //needs to be thought upon
                        message: "Wrong Password",
                    },
                });
            }

            const token = await generateUserToken(user?.dataValues, role);

            res.cookie("token", token, {
                httpOnly: true, // Helps prevent XSS attacks
                maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 1 day)
            });
            return sendSuccessResp(res, {
                data: {
                    // isExist: true,
                    message: "valid login deatils, Access Provided",
                    token,
                },
            });
        } catch (error) {
            sendFailureResp(res, {
                data: {
                    message: "something went wrong",
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
        throw new Error("Error Generating Token:", error.message);
    }
}
