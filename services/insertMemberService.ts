const mysql = require('mysql');
const { connectDatabase, pool } = require('../config/dbConnect');

const signUpUser_Query = 'INSERT INTO member (USER_ID, USER_PW, CUST_NO, NAME, TEL, ADDRESS, EMAIL, BIRTHDAY, REG_DT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, SYSDATE())'
//const signUpUser_Query = 'INSERT INTO member (USER_ID, USER_PW, CUST_NO, NAME, TEL, ADDRESS, EMAIL, BIRTHDAY, REG_DT) VALUES (?, SYSDATE())'

// VALUES (:USER_ID, :USER_PW, :CUST_NO, :NAME, :TEL, SYSDATE, :ADDRESS, :EMAIL, :BIRTHDAY)`;
export const insertMember = async(params?: any) => {
  console.log(`param: ${JSON.stringify(params)}`);
  console.log(Object.values(params));
  
  let connection: any;
  try {
    mysql.outFormat = mysql.OBJECT;
    mysql.autoCommit = false;
    connection = await connectDatabase('mysql');
  } catch (e:any) {
    console.log(`fail: ${JSON.stringify(e.message)}`);
  }
  await connection.query(signUpUser_Query, Object.values(params), (error:any , results:any, fields: any) => {
    if (error) {
      throw error;
    }
    console.log(results); //Promise { <pending> }
  })
  connection.destroy();
  return {
    resultCode: 200,
    message: 'INSERT Success'
  };
  /*


  //let result = await connection.query(signUpUser_Query(), binds);
//INSERT INTO MEMBER (USER_ID, USER_PW, CUST_NO, NAME, TEL, REG_DT, ADDRESS, EMAIL, BIRTHDAY)
  //let result = await connection.query("INSERT INTO MEMBER SET ?")
    connection.query(signUpUser_Query, binds, function (e: any, result: any) {
    if (e) {
      console.log(e);
    } else {
      console.log(result);
      if (result.rowsAffected < 1) {
        connection.rollback();
        connection = null;
        return {resultCode: 413, message: 'INSERT FAIL'};
      }
    }
  })
  //console.log(result);
  
  
  await connection.commit();
  connection = null;
  return { resultCode: 200, message: 'INSERT Success'};
  */
}