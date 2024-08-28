const {
    sendSuccessResp,
} = require('../../../utils/response')
const tryCatchWrapper = require('../../../utils/tryCatchWrapper')


module.exports = {
    createAudi: tryCatchWrapper((async (req, res) => {
        res.send("Chal gya 🥱")
    })),
    updateAudi: tryCatchWrapper((async (req, res) => {

    })),
    getAudiById : tryCatchWrapper((async(req,res)=>{

    })),
    getAudiListByTheatreId: tryCatchWrapper((async (req, res) => {

    }))
}