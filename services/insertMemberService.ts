const mysql = require('mysql');
const { connectDatabase } = require('../../config/dbConnect');

import { signUpUser_Query } from '../query/insertMember';



// VALUES (:USER_ID, :USER_PW, :CUST_NO, :NAME, :TEL, SYSDATE, :ADDRESS, :EMAIL, :BIRTHDAY)`;
export const insertMember = async(params?: any) => {
  console.log(`param: ${JSON.stringify(params)}`);
  let connection;
  try {
    mysql.outFormat = mysql.OBJECT;
    mysql.autoCommit = false;
    connection = await connectDatabase('TEST');
  } catch (e:any) {
    console.log(`fail: ${JSON.stringify(e.message)}`);
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
  let result = await connection.execure(signUpUser_Query(), binds);
  console.log(result);
  if (result.rowsAffected < 1) {
    await connection.rollback();
    connection = null;
    return {resultCode: 413, message: 'INSERT FAIL'};
  }

  await connection.commit();
  connection = null;
  return { resultCode: 200, message: 'INSERT Success'};
}