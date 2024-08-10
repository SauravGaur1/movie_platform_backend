let { salt } = require("../config/config.js").encryption;
const bcrypt = require("bcrypt");

class Encryptor {
    static async hash(value) {
        const hashedValue = await bcrypt.hash(value, salt);
        return hashedValue;
    }
    static async compareHash(originalValue, hashedValue) {
        try {
            return await bcrypt.compare(originalValue, hashedValue);
        } catch (error) {
            console.error("Error comparing hash:", error);
            return false;
        }
    }
}

module.exports = Encryptor;
