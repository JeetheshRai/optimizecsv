// Import the mysql2 package
const mysql = require('mysql2');
const config = require('../app.config');
let connection
class mySQL {
    async initMysql() {
        connection = mysql.createConnection({
            host: config.mysql_database.host,
            user: config.mysql_database.username,
            password: config.mysql_database.password,
            database: config.mysql_database.name
        });
        new Promise((resolve, reject) => {
            connection.connect(err => {
                if (err) {
                    return reject({status:'Failed', error : err})
                }
                console.log('\nESTABLISHED DATABASE CONNECTION TO MYSQL')
                return resolve({status:'success', message :'connected to the database'})
            });
        })
    }

    getCollection() {
        return connection
    }

}

module.exports = new mySQL()
