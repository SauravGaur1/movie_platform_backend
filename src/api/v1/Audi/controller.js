const {
    sendSuccessResp,
} = require('../../../utils/response')
const tryCatchWrapper = require('../../../utils/tryCatchWrapper')
const { Audi } = require('../../../database/index')
const models = require('../../../database/index')
const { customError } = require('../../../utils/error')


module.exports = {

    createAudi: tryCatchWrapper((async (req, res) => {
        const audi = await Audi.createAudi(req.validatedBody, models)

        if (isEmpty(audi)) {
            throw new customError({ message: 'Invalid id' })
        }

        return sendSuccessResp(res, {
            data: {
                message: "Audi Created Successfully"
            },
        });
    })),

    updateAudi: tryCatchWrapper((async (req, res) => {
        const audi = await Audi.updateAudi(req.validatedBody, models)
        if (isEmpty(audi)) {
            throw new customError({ message: 'Unable to Update' })
        }

        return sendSuccessResp(res, {
            data: {
                message: "Audi Updated Successfully"
            },
        });
    })),

    getAudiById: tryCatchWrapper((async (req, res) => {
        const { id } = req.validatedBody
        const audi = await Audi.findOne({
            where: {
                id
            }
        })

        if (isEmpty(audi)) {
            throw new customError({ message: 'Invalid id' })
        }

        const { layout, name, no_of_seats, type } = audi.dataValues

        return sendSuccessResp(res, {
            data: {
                data: { layout, name, no_of_seats, type },
                message: "Audi fetched successfully"
            },
        });
    })),

    getAudiListByTheatreId: tryCatchWrapper((async (req, res) => {
        const { theater_id } = req.validatedBody
        const audi = await Audi.findAll({
            where: {
                theater_id
            }
        })

        if (isEmpty(audi)) {
            throw new customError({ message: 'Invalid Theater id' })
        }

        const audiData = audi.reduce((acc, { dataValues: { layout, name, no_of_seats, type } }) => {
            acc.push({ layout, name, no_of_seats, type })
            return push
        }, [])

        return sendSuccessResp(res, {
            data: {
                data: audiData,
                message: "Audi fetched successfully"
            },
        });
    }))

}