
const fileStream = require('../utils/file_stream.util')
const config = require('../app.config')
const arrayUtil = require('../utils/array.util')
const csvUtil = require('../utils/csv.util')

class ReportService {
    async initReport(data){
        try{
            let usersList
            if(data.generate_from=='system'){
                let fileData = JSON.parse(await fileStream.readFile(config.user_file_path))
                let splitUsers = arrayUtil.splitArray(fileData,6)
                for(let index=0;index<splitUsers.length;index++){
                    await csvUtil.writeChunk(splitUsers[index],config.csv_output_path,index==0?true:false);
                }
                return { status : 'success' , message : 'CSV Created successfully.' }
            }

        } catch (error){
            throw error
        }
    }

    processData(usersList){

    }

}

module.exports = new ReportService();