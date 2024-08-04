const jwt = require("jsonwebtoken");
const jwt_secret_key = require("../config/config.js").jsonWebToken.secretKey;

class JWT {
  static async createToken(payload) {
    try {
      const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, jwt_secret_key, function (err, token) {
          if (err) {
            reject(err);
          }

          resolve(token);
        });
      });
      //   console.log("token created: " + token);
      return token;
    } catch (error) {
      throw new Error("Error Creating Token" + error);
    }
  }

  static async verifyToken(token) {
    try {
      const extractInfo = await new Promise((resolve, reject) => {
        jwt.verify(token, jwt_secret_key, function (err, decoded) {
          if (err) {
            reject(err);
          }
          resolve(decoded);
        });
      });
      return extractInfo;
    } catch (error) {
      throw new Error("Error Verifying Token", error.message);
    }
  }
}

async function main() {
  try {
    const user = {
      id: "101",
      email: "vagishmlk@gmail.com",
      role: "admin",

    };

    const token = await JWT.createToken(user);
    console.log("Created Token: ", token);

    const decoded = await JWT.verifyToken(token);
    console.log("Decoded Token Data: ", decoded);
  } catch (err) {
    console.error("Error", err.message);
  }

  // await console.log(token);
  // JWT.verifyToken(token);
}
main();

module.exports = JWT;
