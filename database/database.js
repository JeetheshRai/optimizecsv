const { MongoClient } = require("mongodb");
const config = require("../app.config");

class Database {
    constructor() {
        this.reConnectTime = 5000
        this.reconnecting = false
    }

    async start() {
        await this.createConnection()
    }


    async createConnection() {
        this.regClient = new MongoClient(config.database.url)
        await this.regClient.connect()
        console.log("\nESTABLISHED DATABASE CONNECTION");
    }

    /**
     * get collection based on encryption
     * @param {string} collection collection name 
     */
    getCollection(collection) {
        return this.regClient.db(config.database.name).collection(collection);
    }

    async checkTopologyError(err) {
        try {

            if (!this.reconnecting) {
                if (err.name === 'MongoError' && err.message === 'Topology is closed') {
                    this.reconnecting = true
                    console.log('Re-establishing connection to MongoDB');
                    await this.regClient.connect();
                    setTimeout(() => {
                        this.reconnecting = false
                    }, this.reConnectTime)
                }
            }

        } catch (error) {
            console.log('Reconnection Error->', error)
        }
    }
}

module.exports = new Database()