const jwt = require("jsonwebtoken");
const jwt_secret_key = require("../config/config.js").jsonWebToken.secretKey;
const { isPlainObject } = require('../utils/validators.js');

class JWT {
  static async createToken(payload) {
    try {
      if(!isPlainObject(payload)) throw new Error("Not a Valid Object to generate Token")
      
      return await jwt.sign(payload, jwt_secret_key);
    } catch (error) {
      console.log(error)
    }
  }

  static async verifyToken(token) {
    try {
      return await jwt.verify(token, jwt_secret_key);
    } catch (error) {}
  }
}

module.exports = JWT;
