const {
    sendSuccessResp,
} = require('../../../utils/response')
const tryCatchWrapper = require('../../../utils/tryCatchWrapper')
const { Audi } = require('../../../database/index')
const models = require('../../../database/index')
const { customError } = require('../../../utils/error')
const { isEmpty } = require('../../../utils/validators')


module.exports = {

    createAudi: tryCatchWrapper((async (req, res) => {
        const audi = await Audi.createAudi(req.validatedBody, models)

        if (isEmpty(audi)) {
            throw new customError({ message: 'Invalid id', statusCode: 400 })
        }

        return sendSuccessResp(res, {
            data: {
                message: "Audi Created Successfully"
            },
        });
    })),

    updateAudi: tryCatchWrapper((async (req, res) => {
        const rowCount = await Audi.updateAudi(req.validatedBody, models)

        if (!rowCount) {
            throw new customError({ message: 'Unable to Update', statusCode: 400 })
        }

        return sendSuccessResp(res, {
            data: {
                message: "Audi Updated Successfully"
            },
        });
    })),

    getAudiById: tryCatchWrapper((async (req, res) => {
        console.log(req)
        const { audi_id: id } = req.params
        const audi = await Audi.findOne({
            where: {
                id
            }
        })

        if (isEmpty(audi)) {
            throw new customError({ message: 'Invalid id', statusCode: 400 })
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
        const { theater_id } = req.params
        console.log(theater_id)
        const audi = await Audi.findAll({
            where: {
                theater_id
            }
        })

        if (isEmpty(audi)) {
            throw new customError({ message: 'Invalid Theater id', statusCode: 400 })
        }

        const audiData = audi.reduce((acc, { dataValues: { layout, name, no_of_seats, type } }) => {
            acc.push({ layout, name, no_of_seats, type })
            return acc
        }, [])

        return sendSuccessResp(res, {
            data: {
                data: audiData,
                message: "Audi fetched successfully"
            },
        });
    }))

}