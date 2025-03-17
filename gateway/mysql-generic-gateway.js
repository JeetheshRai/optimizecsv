const mysqldb = require("../database/mysqldb");

class MysqlGenericGateway {

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
    findList(params) {
        try {
            const record = mysqldb.findList(
                this.collectionName,
                params.query,
                params.projection,
            );
            return record;
        } catch (err) {
            throw err;
        }
    }

    cursor(params) {
        try {
            const record = mysqldb.cursor(
                this.collectionName,
                params.query,
                params.projection,
            );
            return record;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = MysqlGenericGateway
