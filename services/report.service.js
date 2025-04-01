
const fileStream = require('../utils/file_stream.util')
const config = require('../app.config')
const arrayUtil = require('../utils/array.util')
const csvUtil = require('../utils/csv.util')
const { userGateway, mysqluserGateway } = require('../gateway')
class ReportService {
    async initReport(data){
        try{
            if(data.generate_from=='system'){
                let fileData = JSON.parse(await fileStream.readFile(config.user_file_path))
                let splitUsers = arrayUtil.splitArray(fileData,6)
                for(let index=0;index<splitUsers.length;index++){
                    await csvUtil.writeChunk(splitUsers[index],config.csv_output_path,index==0?true:false);
                }
                return { status : 'success' , message : 'CSV Created successfully from the system data.' }
            } else if(data.generate_from=='mongodb'){
                let {getUserList , closeCursor , cursor} = this.initMongoUserCursor(6)
                let append = true
                while(await cursor.hasNext()){
                    let userList = await getUserList()
                    await csvUtil.writeChunk(userList,config.csv_output_path,append);
                    append = false
                }
                await closeCursor()
                return { status : 'success' , message : 'CSV Created successfully from mongodb.' }
            } else if(data.generate_from=='mysql'){
                let cursor = await mysqluserGateway.cursor({})
                return new Promise((resolve, reject) => {
                    let append = 0
                    let batch = [];
                    cursor.on('data',async (row) => {
                        batch.push(row);
                        if (batch.length === 10) {
                            append++
                            csvUtil.writeChunk(batch,config.csv_output_path,append==1?true:false);
                            batch = [];
                        }
                    });
                    cursor.on('end', () => {
                        if (batch.length > 0) {
                            csvUtil.writeChunk(batch,config.csv_output_path,false);
                        }
                        console.log('Query execution finished');
                        return resolve({ status : 'success' , message : 'CSV Created successfully from mysql.'}); 
                    });
                    cursor.on('error', (err) => {
                        connection.end(); 
                        return reject({status :'failed' , error: err});
                    });

                })
            }

        } catch (error){
            throw error
        }
    }

    initMongoUserCursor(limit){
        let cursor = userGateway.cursor({projection:{_id:0}})
        async function getUserList(){
            let userList = []
            while (await cursor.hasNext() && userList.length<limit) {
                userList.push(await cursor.next())
            }
            return userList
        }
        async function closeCursor(){
            return await cursor.close();
        }
        return {getUserList , closeCursor , cursor}
    }

}

module.exports = new ReportService();