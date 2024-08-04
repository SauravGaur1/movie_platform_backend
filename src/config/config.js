require("dotenv").config();

console.log('Loaded ENV JWT_SECRET:',process.env.JWT_SECRET ); // This should log your secret key
console.log('salt:',process.env.BCRYPT_SALT); // This should log your secret key


module.exports = {
  enviornment: {
    active: "dev",
    development: {
      port: 3000,
      host: "127.0.0.1",
    },
    production: {
      port: 80,
      host: "0.0.0.0",
    },
  },
  encryption: {
    salt: process.env.BCRYPT_SALT,
  },
  jsonWebToken: {
    secretKey: process.env.JWT_SECRET,
  },
};

console.log(module.exports);
