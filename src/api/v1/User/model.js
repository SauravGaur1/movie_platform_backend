const { Model, DataTypes, Op } = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { hash } = require("../../../services/encryption.js");
const { isEmail, isPlainObject } = require("../../../utils/validators.js");
const { sendFailureResp } = require("../../../utils/response.js");

class User extends Model {
    static associate(models) {
        User.hasMany(models.Ticket, {
            foreignKey: "user_id",
        });
    }
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
            const userFound = await User.findOne({
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

            const user = await User.create({
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

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        mobile: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
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
        timestamps: true,
        sequelize,
    }
);

module.exports = User;
