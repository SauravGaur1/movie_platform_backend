const jwt = require("jsonwebtoken");
const jwt_secret_key=require("../config/config.js").jsonWebToken;

console.log('Loaded JWT_SECRET:', jwt_secret_key); // This should log your secret key
const secret_key = process.env.JWT_SECRET;

 class JWT {
  static async createToken(userDetail) {
    const payload = {
      email: userDetail.email,
      role: userDetail.role,
    };
    console.log('Secret Key:', secret_key);

    try{
        const token= await new Promise((resolve,reject)=>{
            jwt.sign(payload,secret_key,{ algorithm: "HS256" },function(err,token){
                if(err) reject(err);
                resolve(token);
            });
        });
        return token;
        
    }
    catch(error){
        throw new Error('Error Creating Token' + error);
    }
}


  static async verifyToken(token) {

    try{

        const decoded = await new Promise ((resolve,reject)=>{
            jwt.verify(token,secret_key,function(err,decoded){
                if(err){
                    reject(err);
                }
                resolve(decoded);
            })
        });
        return decoded;
    }
    catch(error){
        throw new Error('Error Verifying Token',error.message);
    }
  }
}

const user={
    email:"vagishmlk@gmail.com",
    role:"admin",
}
JWT.createToken(user);


module.exports = JWT;