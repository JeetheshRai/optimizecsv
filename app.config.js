require('dotenv').config()

const config = {
    generate_csv_from : process.env.GENERATE_CSV_FROM,  //  value - system
    user_file_path : './testdata/users_data.json',
    csv_output_path : './uploads/output.csv',
    database : {
        url : process.env.DB_CONNECTION_STRING,
        name : process.env.DB_NAME
    }
}

module.exports = config;    