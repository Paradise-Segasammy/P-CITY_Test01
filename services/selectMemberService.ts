const mysql = require('mysql');
const { connectDatabase } = require('../config/dbConnect');

const showUser_Query = 'SELECT * FROM member';

export const selectMember = async(params?: any) => {
  //console.log(`param: ${JSON.stringify(params)}`);
  let connection: any;
  let detail: any;

  try {
    mysql.outFormat = mysql.OBJECT;
    mysql.autoCommit = false;
    connection = await connectDatabase('mysql');
  } catch (e:any) {
    console.log(`fail: ${JSON.stringify(e.message)}`);
  }
  console.log(showUser_Query);
  connection.query('SELECT * FROM member', (error:any , results:any, fields: any) => {
    if (error) {
      throw error;
    }
    detail = results;
    console.log(results); //[0]['TEL']
  })

  return {
    resultCode: 200,
    message: 'INSERT Success',
    detail: detail
  };
}
  