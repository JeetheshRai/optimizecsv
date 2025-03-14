require('dotenv').config()

const config = {
    generate_csv_from : process.env.GENERATE_CSV_FROM,  //  value - system
    user_file_path : './testdata/users_data.json',
    csv_output_path : './uploads/output.csv'
    
}

module.exports = config;    