const database = require('./database');

class Mongodb {
    
    cursor (collectionName, query, projection = {}, sort = {}, skip = 0, limit = 0) {
        const options = {
            projection,
            sort,
            skip,
            limit
        };
        const collection = database.getCollection(collectionName)
        return collection.find(query, options);
    }

}

module.exports = new Mongodb();