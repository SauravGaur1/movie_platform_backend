let {salt} = require('../config/config.js').encryption;
salt = Number(salt);
const bcrypt = require('bcrypt');

class Encryptor {
   
    static async hash (
        value
    ) {
        console.log(salt);
        const hashedValue = await bcrypt.hash(value, salt);
        return hashedValue;
    }

    static async compareHash ({
        orignalValue,
        hashedValue
    }) {
        console.log(orignalValue, hashedValue);
        try{
            return bcrypt.compare(orignalValue, hashedValue);
        } catch {
            return false;
        }
    }

}


module.exports = Encryptor;