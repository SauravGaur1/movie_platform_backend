const { Model, DataTypes, Op } = require("sequelize");

const { sequelize } = require("../../../database/database.js");
const { hash, compareHash } = require("../../../services/encryption.js");
const { customError } = require("../../../utils/error.js");

class Admin extends Model {
    static associate(_) {}
    static async findUser({
        email,
        password = null,
        mobile = 0,
    }) {
        try {
            const userFound = await Admin.findOne({
                where: {
                    [Op.or]: [{ email: email }, { mobile: mobile }],
                },
            });

            if (!userFound) {
                return -1;
            }

            if(password) {
                var hashComparisonIsTrue = await compareHash(
                    password,
                    userFound?.dataValues?.password
                );
            }
            
            if (!hashComparisonIsTrue) {
                return 0;
            }

            return userFound;
        } catch (err) {
            throw new customError(err.message);
        }
    }

    static async createUser({
        name,
        email,
        password,
        mobile
    }) {
        try {
            const user = await Admin.create({
                name: name,
                email: email,
                password: password,
                mobile: mobile,
            });
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
            defaultValue: DataTypes.NOW, 
            onUpdate: DataTypes.NOW,
        },
    },

    {
        timestamps: false,
        sequelize,
    }
);

Admin.beforeCreate(async (admin) => {
    admin.password = await hash(admin.password);
    return admin;
})

module.exports = Admin;
