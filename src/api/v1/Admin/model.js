const { Model, DataTypes, Op } = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { hash } = require("../../../services/encryption.js");
const { isEmail, isPlainObject } = require("../../../utils/validators.js");
const { sendFailureResp } = require("../../../utils/response.js");

class Admin extends Model {
    static associate(models) {}
    static async findUser(email, mobile) {
        try {
            if (!isEmail(email)) {
                sendFailureResp(res, {
                    status: 400,
                    data: {
                        message: "Email is not valid",
                    },
                });
            }
            const userFound = await Admin.findOne({
                where: {
                    [Op.or]: [{ email: email }, { mobile: mobile }],
                },
            });

            return userFound;
        } catch (err) {
            throw new Error("couldn't find user", err.message);
        }
    }

    static async createUser(name, email, password, mobile) {
        try {
            if (!isEmail(email)) {
                sendFailureResp(res, {
                    status: 400,
                    data: {
                        message: "Email is not valid",
                    },
                });
            }
            const hashedPassword = await hash(password);

            const user = await Admin.create({
                name: name,
                email: email,
                password: hashedPassword,
                mobile: mobile,
            });
            console.log("user created successfully");
            return user;
        } catch (err) {
            throw new Error("Error creating user");
        }
    }
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            limit: 256,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Sets the default value to the current timestamp
            onUpdate: DataTypes.NOW, // Updates the timestamp on record update
        },
    },

    {
        timestamps: false,
        sequelize,
    }
);

// async function findUser(role, email) {
//
// }

module.exports = Admin;
