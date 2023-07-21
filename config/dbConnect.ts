const oracledb = require('oracledb');
const dbConfig = require('./oracle_dbconfig')


export const connectDatabase = (MODE: string) => {
    if (MODE == 'IR') {
        return oracledb.getConnection(dbConfig.IR);
        console.log('DB connected..');
    } else if (MODE == 'IRDEV') {
        return oracledb.getConnection(dbConfig.IRDEV);
    }
}


 module.exports = { connectDatabase }