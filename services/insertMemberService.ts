const mysql = require('mysql');
const { connectDatabase } = require('../config/dbConnect');

import { signUpUser_Query } from '../query/insertMember';



// VALUES (:USER_ID, :USER_PW, :CUST_NO, :NAME, :TEL, SYSDATE, :ADDRESS, :EMAIL, :BIRTHDAY)`;
export const insertMember = async(params?: any) => {
  //console.log(`param: ${JSON.stringify(params)}`);
  let connection: any;
  try {
    mysql.outFormat = mysql.OBJECT;
    mysql.autoCommit = false;
    connection = await connectDatabase('TEST').connect();
  } catch (e:any) {
    //console.log(`fail: ${JSON.stringify(e.message)}`);
  }
  let binds = {
    USER_ID: params.USER_ID,
    USER_PW: params.USER_PW,
    CUST_NO: params.CUST_NO,
    NAME: params.NAME,
    TEL: params.TEL,
    ADDRESS: params.ADDRESS,
    EMAIL: params.EMAIL,
    BIRTHDAY: params.BIRTHDAY,
  }

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
}