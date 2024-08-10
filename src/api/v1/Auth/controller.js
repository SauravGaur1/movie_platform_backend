const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { models } = require("../../../database/index.js");
const { User, Admin } = models;

const { createToken} = require("../../../services/jwt.js");

module.exports = {
    signup: (req, res) => {
        sendSuccessResp(res, {
            data: {
                message: "Mann Lo Ki User Sign UP ho gya",
            },
        });
    },

    login: async (req, res) => {
        await sequelize
            .sync()
            .then(async () => {
                const user = await findUser(
                    req.body.role,
                    req.body.email,
                    req.body.password
                );

                if (!user) {
                    return sendFailureResp(res, {
                        error: "User not found",
                    });
                }
                // console.log(user.dataValues);

                const token = await generateUserToken(user,req.body.role);

                return sendSuccessResp(res, {
                    data: {
                        message: "valid login deatils, Access Provided",
                        token: token,
                    },
                });
            })
            .catch((error) => {
                console.error("Unable to find User : ", error);
                sendFailureResp(res, {
                    data: {
                        message: error,
                    },
                });
            });
    },
};

async function generateUserToken(user,role) {
    try {
        return await createToken({
			role:role,
            id: user.dataValues.id,
            email: user.dataValues.email,
        });
    } catch (error) {
        throw new Error("Error Generating Token:", error.message);
    }
}

async function findUser(role, email, password) {
    try {
        let currentModel;

        if (role == 1) {
            currentModel = Admin;
        }
        if (role == 0) {
            currentModel = User;
        }
        return await currentModel.findOne({
            where: {
                email: email,
                password: password,
            },
        });
    } catch (error) {
        throw new Error("Error finding user: ", error.message);
    }
}
