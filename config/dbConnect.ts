const oracledb = require('oracledb');
const mysql = require('mysql');
const oracleConfig = require('./oracle_dbconfig')
const mysqlConfig = require('./mysql_dbconfig');


export const connectDatabase = (MODE: string) => {
    if (MODE == 'IR') {
      console.log('DB connected..');
      return oracledb.getConnection(oracleConfig.IR);

    } else if (MODE == 'IRDEV') {
      return oracledb.getConnection(oracleConfig.IRDEV);

    } else if (MODE == 'mysql') {
      const connection = mysql.createConnection(mysqlConfig);
      connection.connect();
      console.log('mysql connected ..');
      //const connection = new Promise((resolve: any, reject: any) => { //await
      return connection;
      //})
    }
}


 module.exports = { connectDatabase }