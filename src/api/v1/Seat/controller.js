const { sendSuccessResp } = require('../../../utils/response');
const { Seat } = require('../../../database/index');
const tryCatchWrapper = require('../../../utils/tryCatchWrapper');
const { customError } = require('../../../utils/error');
const { isEmpty } = require('../../../utils/validators');

module.exports = {
  create: tryCatchWrapper(async (req, res) => {
    const { category, seat_code } = req.validatedBody;
    const { dataValues: seat, isNewRecord } = await Seat.createSeat({
      category,
      seat_code,
    });

    if (!isNewRecord) {
      throw new customError({
        message: 'Already Exists!',
        statusCode: 400,
      });
    }

    return sendSuccessResp(res, {
      status: 200,
      data: {
        seatDetails: seat,
        message: 'Created Successfully!',
      },
    });
  }),

  update: tryCatchWrapper(async (req, res) => {
    const { category, seat_code, id } = req.validatedBody;
    const rowCount = await Seat.updateSeat({
      id,
      category,
      seat_code,
    });

    if (!rowCount) {
      throw new customError({
        message: 'Unable to Update',
        statusCode: 400,
      });
    }

    return sendSuccessResp(res, {
      status: 200,
      data: {
        message: 'Updated Successfully!',
      },
    });
  }),

  getSeats: tryCatchWrapper(async (req, res) => {
    const seats = await Seat.findAll()

    let seatsList = []
    if (!isEmpty(seats)) {
      seatsList = seats.reduce((acc, { dataValues: { id, category, seat_code } }) => {
        acc.push({ id, category, seat_code })
        return acc
      }, [])
    }

    return sendSuccessResp(res, {
      data: {
        seats: seatsList,
        message: "Seats fetched successfully"
      },
    });
  })
};
