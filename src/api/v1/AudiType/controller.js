const { sendSuccessResp } = require('../../../utils/response');
const { AudiType } = require('../../../database/index');
const tryCatchWrapper = require('../../../utils/tryCatchWrapper');
const { customError } = require('../../../utils/error');
const { isEmpty } = require('../../../utils/validators');

module.exports = {
    create: tryCatchWrapper(async (req, res) => {
        const { dataValues: audiType } = await AudiType.createAudiType(req.validatedBody);

        if (isEmpty(audiType)) {
            throw new customError({
                message: 'Unable to create Audi',
                statusCode: 400,
            });
        }

        return sendSuccessResp(res, {
            status: 200,
            data: {
                id: audiType.id,
                message: 'Created Successfully!',
            },
        });
    })
}