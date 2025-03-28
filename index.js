const config = require('./app.config');
const { database , mysql } = require('./database');
const ReportService = require('./services/report.service');
const file_streamUtil = require('./utils/file_stream.util');
    (async () => {
        if(config.generate_csv_from=='mysql')await mysql.initMysql()
        if(config.generate_csv_from=='mongodb')await database.start()
    if (!file_streamUtil.existsSync('./uploads')) {
        await file_streamUtil.createFolder('./uploads', { recursive: true });
        console.log('Uploads Folder created.');
    }
    ReportService.initReport({ generate_from: config.generate_csv_from }).then(data => {
        console.log('Result : ', data)
    }).catch(error => {
        console.log('Error : ', error)
    })
})()