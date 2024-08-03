let {salt} = require('../config/config.js').encryption;
const bcrypt = require('bcrypt');

class Encryptor {
   
    static async hash (
        value
    ) {
        const hashedValue = await bcrypt.hash(value, salt);
        return hashedValue;
    }

    static async compareHash ({
        orignalValue,
        hashedValue
    }) {
        try{
            return bcrypt.compare(orignalValue, hashedValue);
        } catch {
            return false;
        }
    }

}


module.exports = Encryptor;