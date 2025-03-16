const { mongodb } = require("../database/index.js");
class GenericGateway {

    constructor(collectionName) {
        this.collectionName = collectionName
    }

    /**
     * 
     * @param {Object} params 
     * @param {Object} params.query
     * @param {Object} params.projection
     * @param {Object} params.skip
     * @param {Object} params.limit
     * @param {Object} params.sort
     * @returns 
     */
    cursor(params) {
            try {
                const record = mongodb.cursor(
                    this.collectionName,
                    params.query,
                    params.projection,
                    params['sort'],
                    params.skip,
                    params.limit
                );
                return record;
            } catch (err) {
                throw err;
            }
    }
}

module.exports = GenericGateway
