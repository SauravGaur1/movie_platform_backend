const jwt = require("jsonwebtoken");
const jwt_secret_key = require("../config/config.js").jsonWebToken.secretKey;

class JWT {
  static createToken(payload) {
    try {
      const token = jwt.sign(payload, jwt_secret_key);
      return token;
    } catch (error) {
      throw new Error("Error Creating Token: " + error);
    }
  }

  static async verifyToken(token) {
    try {
      const extractInfo = jwt.verify(token, jwt_secret_key);
      return extractInfo;
    } catch (error) {
      throw new Error("Error Verifying Token", error.message);
    }
  }
}

/*
    // To see if it is working
function main() {
  try {
    const user = {
      id: "101",
      email: "vagishmlk@gmail.com",
      role: "admin",
    };

    const token = JWT.createToken(user);
    console.log("\nGenerated Token: ", token);

    const decoded = JWT.verifyToken(token);
    console.log("\nDecoded Token Data: ", decoded);
  } catch (err) {
    console.error("Error", err.message);
  }

  // await console.log(token);
  // JWT.verifyToken(token);
}

main();
*/

module.exports = JWT;
