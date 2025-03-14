const fs = require('fs');

class fileStream {
    readFile(filePath, encoding = 'utf8') {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(filePath, encoding, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    async createFolder(path) {
        try {
            return new Promise((resolve,reject)=>{
                fs.mkdir(path, { recursive: true }, (err) => {
                    if (err) {
                      reject(err)
                    }
                    resolve({status: 'success' , message : 'File created successfully'})
                  });
            })
        } catch (error) {
            throw error
        }
    }
    
    existsSync(path) {
        try {
            if(fs.existsSync(path)){
                return true
            } 
            return false
        } catch (error) {
            throw error
        }
    }

}

module.exports = new fileStream();