const { sendFailureResp } = require('../utils/response');
const JWT = require('../services/jwt.js');
const { customError } = require('../utils/error.js');
const { sanitizeToken } = require('../utils/sanitize.js')
const { isEmpty } = require('../utils/validators');

module.exports = {
  authenticate: (role = 0) => async (req, res, next) => {
    try {
      const token = sanitizeToken(req.headers['authorization'])
      if (isEmpty(token)) {
        throw new customError({ message: 'Token not Found!' })
      }
      const decoded = await JWT.verifyToken(token);
      if (isEmpty(decoded)) {
        throw new customError({ message: 'Invalid Token!' });
      }
      if (decoded.role != role) {
        throw new customError({ message: "Invalid Role!" })
      }
      req.User = decoded;
      next();
    } catch (error) {
      return sendFailureResp(res, {
        status: 401,
        data: error.message,
      });
    }
  },
};
