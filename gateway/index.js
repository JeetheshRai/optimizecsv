const GenericGateway = require('./generic-gateway');
const MysqlGenericGateway = require('./mysql-generic-gateway');

module.exports = {
    userGateway: new GenericGateway('user_info'),
    mysqluserGateway: new MysqlGenericGateway('users_info')
}