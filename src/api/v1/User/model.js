const { Model, DataTypes, Op } = require('sequelize');

const { sequelize } = require('../../../database/database.js');
const {
  hash,
  compareHash,
} = require('../../../services/encryption.js');
const {
  isEmpty,
} = require('../../../utils/validators.js');
const { customError } = require('../../../utils/error.js');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Ticket, {
      foreignKey: 'user_id',
    });
  }
  static async findUser({ 
    email,
    password = null,
    mobile = 0,
  }) {
    try {
      const userFound = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { mobile: mobile }],
        },
      });

      if (!userFound) {
        return -1;
      }

      if(!isEmpty(password)) {
        var hashComparisonIsTrue = await compareHash(
          password,
          userFound?.dataValues?.password,
        );
      }
      
      if (!hashComparisonIsTrue) {
        return 0;
      }

      return userFound;
    } catch (err) {
      throw new customError({
        message: err.message
      });
    }
  }

  static async createUser({ 
    name,
    email,
    password,
    mobile 
  }) {
    try {
      const user = await User.create({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
      });
      return user;
    } catch (err) {
      throw new customError({
        message: err.message
      })
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
      defaultValue: DataTypes.NOW, 
      onUpdate: DataTypes.NOW,
    },
  },

  {
    timestamps: true,
    sequelize,
  },
);

User.beforeCreate(async (user) => {
  user.password = await hash(user.password);
  return user;
})

module.exports = User;
