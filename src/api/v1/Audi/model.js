const { Model, DataTypes, Op, and } = require('sequelize');

const { sequelize } = require('../../../database/database.js');
const { isEmpty } = require('../../../utils/validators.js');
const { customError } = require('../../../utils/error.js');

class Audi extends Model {
  static associate(models) {

    Audi.belongsTo(models.AudiType, {
      foreignKey: 'type',

    });

    Audi.belongsTo(models.Theaters, {
      foreignKey: 'theater_id',
    });

    Audi.hasMany(models.Show, {
      foreignKey: 'audi_id'
    });
  }

  static async createAudi({
    type,
    theater_id,
    name,
    layout,
    no_of_seats
  }, models) {
    const data = await this.findOne({
      where: {
        [Op.and]: [{ name }, { theater_id }, { type }]
      }
    })

    if (!isEmpty(data)) {
      throw new customError({ message: 'Audi already exists', statusCode: 400 })
    }

    const isValidLayout = await validateLayout({ layout: layout, no_of_seats: no_of_seats }, models)

    if (!isValidLayout) {
      throw new customError({ message: 'Invalid Layout', statusCode: 400 })
    }

    const { dataValues: audi } = await this.create({
      type,
      theater_id,
      name,
      layout,
      no_of_seats
    })
    return audi
  }

  static async updateAudi({
    id,
    type,
    name,
    layout,
    no_of_seats
  }, models) {
    const data = await this.findOne({
      where: {
        id
      }
    })

    if (isEmpty(data)) {
      throw new customError({ message: 'Invalid Id', statusCode: 400 })
    }

    if (!isEmpty(layout)) {
      const isValidLayout = await validateLayout({ layout: layout, no_of_seats: no_of_seats }, models)

      if (!isValidLayout) {
        throw new customError({ message: 'Invalid Layout', statusCode: 400 })
      }
    }

    const [count] = await this.update({
      type,
      name,
      layout,
      no_of_seats
    }, {
      where: { id }
    })

    return count
  }
}

Audi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    no_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    layout: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
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
    timestamps: false, sequelize
  },
);


async function validateLayout({ layout, no_of_seats }, { Seat }) {

  try {
    const flatLayout = layout.flat()
    const count = flatLayout.reduce((acc, seat) => {
      return !!seat ? ++acc : acc
    }, 0)

    if (count != no_of_seats) {
      throw new customError({ message: 'Invalid No. of Seats', statusCode: 400 })
    }

    const seatsInLayout = new Set(flatLayout)

    const seatList = await Seat.findAll()
    if (isEmpty(seatList)) {
      return false
    }

    const seatCodes = new Set(seatList.reduce((acc, { dataValues: { seat_code } }) => {
      acc.push(seat_code)
      return acc
    }, [0]))

    const difference = [...seatsInLayout].filter(element => !seatCodes.has(element))

    return isEmpty(difference)
  }
  catch (err) {
    throw new customError({ message: err.message, statusCode: err.statusCode })
  }

}

module.exports = Audi;