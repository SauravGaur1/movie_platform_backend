class configHandler {

    constructor() {
        this.seatCodes = {
            1: 'Classic',
            2: 'Prime',
            3: 'Prime Plus',
        };
        this.audiType = { 
            0: '2D',
            1: '3D'
        }
        return this
    }

    setConfig({ key, value }) {
        this[key] = value;
        console.log(this)
    }

    getConfig(key) {
        return this[key];
    }
}

const configHandlerInstance = new configHandler();

module.exports = configHandlerInstance