const { Model, DataTypes, Op } = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { hash, compareHash } = require("../../../services/encryption.js");
const { isEmail, isPlainObject } = require("../../../utils/validators.js");
const { toLowerCase } = require("../../../utils/sanitize.js");
const { sendFailureResp } = require("../../../utils/response.js");
const { customError } = require("../../../utils/error.js");

class Admin extends Model {
    static associate(models) {}
    static async findUser(email, password, mobile) {
        try {
            const userFound = await Admin.findOne({
                where: {
                    [Op.or]: [{ email: email }, { mobile: mobile }],
                },
            });
            if (!userFound) {
                return -1;
            }
            const hashComparisonIsTrue = await compareHash(
                password,
                userFound?.dataValues?.password
            );

            if (!hashComparisonIsTrue) {
                return 0;
            }

            return userFound;
        } catch (err) {
            throw new customError(err.message);
        }
    }

    static async createUser(name, email, password, mobile=0) {
        try {
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
            throw new customError(err.message);
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

module.exports = Admin;
