const { customError } = require("../../../utils/error");
const { sendSuccessResp } = require("../../../utils/response");
const tryCatchWrapper = require("../../../utils/tryCatchWrapper");
const { isEmpty } = require("../../../utils/validators");
const { Theaters } = require("../../../database/index")


module.exports = {
    createTheater: tryCatchWrapper(async (req, res) => {
        const theater = await Theaters.createTheater(req.validatedBody)
        if (isEmpty(theater)) {
            throw new customError({ message: "Unable to create theater" })
        }
        return sendSuccessResp(res, {
            status: true,
            data: theater,
            message: "Theater created successfully"
        })
    })
}