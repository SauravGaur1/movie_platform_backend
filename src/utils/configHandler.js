class configHandler {

    constructor() {
        this.seatCodes = {
            1: 'Classic',
            2: 'Prime',
            3: 'Prime Plus',
        };
        return this
    }

    setConfig({ key, value }) {
        this[key] = value;
    }

    getConfig(key) {
        return this[key];
    }
}

module.exports = configHandler