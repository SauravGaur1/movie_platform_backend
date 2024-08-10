const {
  sendSuccessResp,
  sendFailureResp,
} = require('../../../utils/response.js');

const {
  models: { User, Admin },
} = require('../../../database/index.js');
const { createToken } = require('../../../services/jwt.js');

module.exports = {
  signup: async (req, res) => {
    const { name, password, email, role_name } = req.body;
    const model = role_name == 'ADMIN' ? Admin : User;
    try {
      const data = await model.findOne({ where: { email } });
      if (!data) {
        const { dataValues } = await model.create({
          name: name,
          email: email,
          password: password,
        });
        if (Object.keys(dataValues)?.length) {
          const token = await createToken({
            id: dataValues?.id,
            name,
            email,
          });
          return sendSuccessResp(res, {
            status: 200,
            data: {
              isExist: 0,
              token,
              message: 'Sign Up Successfully!',
            },
          });
        }
      } else {
        return sendFailureResp(res, {
          status: 400,
          data: {
            isExist: 1,
            message: 'User already exists',
          },
        });
      }
    } catch (err) {
        return sendFailureResp(res, {
          status: 500,
          data: {
            message: 'Something went wrong!',
          },
        });
    }
  },

  login: (req, res) => {
    sendSuccessResp(res, {
      data: {
        message: 'Maan Lo Ki User Login ho Gya',
      },
    });
  },
};