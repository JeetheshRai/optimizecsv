const config = require('./app.config')
const ReportService = require('./services/report.service');
const file_streamUtil = require('./utils/file_stream.util');
if (!file_streamUtil.existsSync('./uploads')) {
    (async () => {
        await file_streamUtil.createFolder('./uploads', { recursive: true });
        console.log('Uploads Folder created.');
    })()
}
ReportService.initReport({ generate_from: config.generate_csv_from }).then(data => {
    console.log('Result : ', data)
}).catch(error => {
    console.log('Error : ', error)
})