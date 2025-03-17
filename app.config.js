require('dotenv').config()

const config = {
    generate_csv_from : process.env.GENERATE_CSV_FROM,  //  value - system - mongodb - mysql
    user_file_path : './testdata/users_data.json',
    csv_output_path : './uploads/output.csv',
    mongo_database : {
        url : process.env.MONGO_DB_CONNECTION_STRING,
        name : process.env.MONGO_DB_NAME
    },
    mysql_database : {
        host : process.env.MYSQL_HOST,
        username : process.env.MYSQL_USERNAME,
        password : process.env.MYSQL_PASSWORD,
        name : process.env.MYSQL_DB_NAME
    }
}

module.exports = config;    