const { sendFailureResp } = require('../utils/response');
const JWT = require ('../services/jwt.js');

module.exports = {
authenticate: () => async(req, res, next) => {

  try{
    const decoded = await JWT.verifyToken(req.body.token);
    req.User = decoded
    next();
  }
  catch(error){
    return sendFailureResp(res, {
      status: 401,
      data: error.message,
    });
  }

}
};