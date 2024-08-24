const { sendSuccessResp } = require('../../../utils/response');
const { Seat } = require('../../../database/index');
const asyncHandler = require('../../../utils/asyncHandler');
const { customError } = require('../../../utils/error');

module.exports = {
  create: asyncHandler(async (req, res) => {
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

  update: asyncHandler(async (req, res) => {
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
};
