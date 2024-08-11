const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { models } = require("../../../database/index.js");
const { User, Admin } = models;

const { createToken } = require("../../../services/jwt.js");

const { compareHash } = require("../../../services/encryption.js");
const { valid } = require("joi");

const roleArray = [User, Admin];

module.exports = {
    signup: async (req, res) => {
        const { role, name, mobile, email, password } = req.body;

        try {
            const userExists = await roleArray[role].findUser(email, mobile);

            if (userExists) {
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
            let dummyMobile = 0;

            const user = await roleArray[role].findUser(email, dummyMobile);

            if (!user) {
                return sendFailureResp(res, {
                    data: {
                        isExist: false,
                        message: "User not found",
                    },
                });
            }

            const hashComparison = await compareHash(
                password,
                user?.dataValues?.password
            );

            if (!hashComparison) {
                return sendFailureResp(res, {
                    data: {
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
                    message: "valid login deatils, Access Provided",
                    token,
                },
            });
        } catch (error) {
            console.error("Unable to find User : ", error);
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
