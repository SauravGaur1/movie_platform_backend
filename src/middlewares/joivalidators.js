const { sendFailureResp } = require("../utils/response");

module.exports = {
    validate: (schema) => (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        
        if (error) {
          return sendFailureResp(
            res, {
                status: 400,
                data: error
            }
          )
        }
      
        req.validatedBody = value;
        next();
    }
}