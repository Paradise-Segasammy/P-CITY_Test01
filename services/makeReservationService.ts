const mysql = require('mysql');
const { connectDatabase } = require('../config/dbConnect');

const makeRes_Query = 'INSERT INTO reservation_info (CUST_NO, RMNO, USER_ID, NAME, TEL, REG_DT, RES_YN, RES_NO, RES_DATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
const nowInfo_Query = 'SELECT SYSDATE() AS DT, USER_ID, NAME, TEL FROM member WHERE CUST_NO = ?'


export const makeReservation = async(params?: any) => {
  console.log(`param: ${JSON.stringify(params)}`);
  
  let connection: any;
  try {
    mysql.outFormat = mysql.OBJECT;
    mysql.autoCommit = false;
    connection = await connectDatabase('mysql');
  } catch (e:any) {
    console.log(`fail: ${JSON.stringify(e.message)}`);
  }

  let dt: string|undefined;
  let userid: string|undefined;
  let name: string|undefined;
  let tel: string|undefined;
  
  await connection.query(nowInfo_Query, [params['CUST_NO']], (error: any, results: any, fields: any) => {
    if (error) throw error;
    console.log(`res = ${JSON.stringify(results)}`);

    if (results) {
      dt = results[0]['DT'];
      userid = results[0]['USER_ID']
      name = results[0]['NAME'];
      tel = results[0]['TEL'];
    } else {
      return {
        resultCode: 400,
        message: 'fail'
      };
    }

    let result1;
    let binds1 = [params['CUST_NO'], params['RMNO'], userid, name, tel, dt, params['RES_YN'], params['RES_NO'], params['RES_DATE']];
    console.log(binds1);
    connection.query(makeRes_Query, binds1, (error: any, results: any) => {
      if (error) throw error;
      result1 = results;
      console.log(result1)
    })
  
  return {
    resultCode: 200,
    detail: result1
  };

})
}