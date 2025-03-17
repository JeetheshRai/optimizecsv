const database = require("./database")
const mysql = require("./databasemssql")
const mongodb = require("./mongodb")

module.exports = {
    mongodb,
    database,
    mysql
}