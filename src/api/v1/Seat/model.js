const { DataTypes, Model, Op } = require('sequelize');
const { sequelize } = require('../../../database/database');
const { isEmpty } = require('../../../utils/validators');
const { customError } = require('../../../utils/error');
const { config } = require('../../../config/config');

class Seat extends Model {

  static associate(models) { }

  static async createSeat({ category, seat_code }) {
    try {
      const seat = await this.findOrCreate({
        where: {
          [Op.or]: [{ category }, { seat_code }],
        },
      });

      return seat;
    } catch (err) {
      throw new customError({ message: err.message });
    }
  }

  static async updateSeat({ id, category, seat_code }) {
    try {
      const isExist = await this.findOne({ where: { id } });

      if (isEmpty(isExist)) {
        throw new customError({ message: 'Invalid Id', statusCode: 400 })
      }
      const [count, rows] = await this.update(
        {
          category, seat_code
        },
        {
          where: { id }
        }
      );
      return count;
    } catch (err) {
      throw new customError({ message: err.message });
    }
  }

}

Seat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    seat_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
  },
);

module.exports = Seat;
