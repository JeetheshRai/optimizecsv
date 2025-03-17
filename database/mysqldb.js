const mysql = require("./databasemssql");

class MySQLdb {

    findList(collectionName, query = '', projection = '*') {
        const connection = mysql.getCollection()
        return new Promise((resolve, reject) => {
            connection.query('SELECT ' + projection + ' FROM ' + collectionName + ' ' + query, (err, results, fields) => {
                if (err) {
                    return reject({ status: 'failed', error: err })
                }
                return resolve(results);
            });
        })
    }

    cursor(collectionName, query = '', projection = '*') {
        const connection = mysql.getCollection()
        const queryStream = connection.query('SELECT ' + projection + ' FROM ' + collectionName + ' ' + query, { cursor: true });
        return queryStream.stream();
    }

}

module.exports = new MySQLdb();