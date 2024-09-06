const  { createClient } = require("redis");

class Redis {

    #client;

    async build() {
        this.#client = await createClient()
        .on('error', async err => {
            console.log('Redis Client Error', err);
            await this.#client?.disconnect();
        })
        .connect();
    }

    async set({
        key,
        value
    }) {
        await this.#client.set(key, value);
    }

    async get({
        key
    }) {
        return await this.#client.get(key);
    }

    async dispose() {
        await this.#client.disconnect();
    }

}

const client = new Redis();

(async () => { await client.build() })();

module.exports = client;

