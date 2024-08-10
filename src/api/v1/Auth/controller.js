const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { models } = require("../../../database/index.js");
const { User, Admin } = models;

const { createToken } = require("../../../services/jwt.js");

const { hash, compareHash } = require("../../../services/encryption.js");

const roleArray = [User, Admin];

module.exports = {
    signup: async (req, res) => {
        const { role, name, mobile, email, password } = req.body;
        const model = roleArray[role];
        try {
            const data = await findUser(role, email);
            const hashedPassword = await hash(password);

            if (!data) {
                const { dataValues } = await model.create({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: hashedPassword,
                });

                if (Object.keys(dataValues)?.length) {
                    const token = await generateUserToken(dataValues, role);

                    return sendSuccessResp(res, {
                        status: 200,
                        data: {
                            isExist: 0,
                            token,
                            message: "Sign Up Successfully!",
                        },
                    });
                }
            } else {
                return sendFailureResp(res, {
                    status: 400,
                    data: {
                        isExist: 1,
                        message: "User already exists",
                    },
                });
            }
        } catch (err) {
            return sendFailureResp(res, {
                status: 500,
                data: {
                    message: "Something went wrong!",
                },
            });
        }
    },

    login: async (req, res) => {
        await sequelize
            .sync()
            .then(async () => {
                const { role, email, password } = req.body;

                const user = await findUser(role, email);

                if (!user) {
                    return sendFailureResp(res, {
                        data: {
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

                return sendSuccessResp(res, {
                    data: {
                        message: "valid login deatils, Access Provided",
                        token,
                    },
                });
            })
            .catch((error) => {
                console.error("Unable to find User : ", error);
                sendFailureResp(res, {
                    data: {
                        message: "something went wrong",
                    },
                });
            });
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

async function findUser(role, email) {
    try {
        const model = roleArray[role];

        return await model.findOne({
            where: {
                email: email,
            },
        });
    } catch (error) {
        throw new Error("Error finding user: ", error.message);
    }
}
