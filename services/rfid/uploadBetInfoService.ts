const oracledb = require('oracledb');
const { connectDatabase } = require('../../config/dbConnect');

import { uploadBetInfo_Query, checkSalesDate_Query, checkSeq_Query, checkCustNo_Query } from '../../query/rfid/uploadBetInfo'

// sql injection 방지
const escapeInjection = (value: any) => {
  // console.log(`escapeTag prev >> `, value);
  if (typeof value === 'string') {
      value = value.replace(/\&/g, '&#38;');
      value = value.replace(/\#/g, '&#35;');
      value = value.replace(/\</g, '&lt;');
      value = value.replace(/\>/g, '&gt;');
      value = value.replace(/\(/g, '&#40;');
      value = value.replace(/\)/g, '&#41;');
      value = value.replace(/\"/g, '&quot;');
      value = value.replace(/\'/g, '&#39;');
      value = value.replace(/case/gi, '');
      value = value.replace(/if/gi, '');
      value = value.replace(/where/gi, '');
      value = value.replace(/decode/gi, '');
      value = value.replace(/\|\|/gi, '');
      value = value.replace(/select/gi, '');
      value = value.replace(/update/gi, '');
      value = value.replace(/insert/gi, '');
      value = value.replace(/delete/gi, '');
      value = value.replace(/convert/gi, '');
      value = value.replace(/drop/gi, '');
      value = value.replace(/union/gi, '');
  }
  return value;
}

//날짜 변경 함수

export const uploadBetInfo =  async (params?: any, pool?: any) => {
  console.log(`param : ${JSON.stringify(params)}`);
  let connection;
  let custno: string;
  let seq: number;
  
  try {
    
    oracledb.outFormat = oracledb.OBJECT;
    oracledb.autoCommit = false;
  
    connection = await connectDatabase('IRDEV');

  } catch (e:any) {
    console.log(`fail : ${JSON.stringify(e.message)}`);
  }

  let sd = await connection.execute(checkSalesDate_Query());

  if (sd.rows.length == 1) {
    sd = sd.rows[0]['CLOSE_DATE'];
    sd = parseInt(sd)+1;
    console.log(sd);

  } else {
    console.log('err: 운영일자 확인 필요');
    connection = null;
    return {resultCode: 410, message: 'Sales Date Error' };
  }
  

  let binds = {
    SALES_DATE: String(sd), // db에 기록된 영업일자+1. 확인필요
    TBL_CD: params.TABLE_ID,
    SEAT_NO: params.SEAT_NO,
  }
  console.log(binds);
/*
  let sample = {
    SALES_DATE: '20230403',
    TBL_CD: 'BC-054',
    SEAT_NO: 6,
  }*/
  let row1 = await connection.execute(checkCustNo_Query(), binds);

  custno = row1.rows[0]['C_CUST_NO'];

  let binds2 = {
    SALES_DATE: String(sd),
    TBL_CD: params.TABLE_ID,
    SEAT_NO: params.SEAT_NO,
    C_CUST_NO: custno,
  }
  console.log(binds2);
  let row2 = await connection.execute(checkSeq_Query(), binds2);
  seq = row2.rows[0]['SEQ'];

  if (custno && seq) {
    console.log(custno,(seq));
  } else {
    console.log('err: 고객번호 확인 불가');
    connection = null;
    return {resultCode: 410, message: 'cust no Error' };
  }

  // 사전정보 확인완, 실제upload
  // INSERT INTO TEST.RFID_BET_INFO (BRANCH_CD, C_CUST_NO, SALES_DATE, SEQ, TBL_CD, SEAT_NO, /REG_DTIME/, PLAY_BET, BANKER_BET, TIE_BET, PAIR_BET, LUCKY_BET)
  let binds3 = {
    BRANCH_CD: '1000',
    C_CUST_NO: custno,
    SALES_DATE: String(sd),
    SEQ: seq+1,
    TBL_CD: params.TABLE_ID,
    SEAT_NO: params.SEAT_NO,
    PLAY_BET: params.BET_P,
    BANKER_BET: params.BET_B,
    TIE_BET: params.BET_T,
    PAIR_BET: params.BET_PP + params.BET_BP,
    LUCKY_BET: params.BET_LS,
  }

  let result = await connection.execute(uploadBetInfo_Query(), binds3);
  
  if (result.rowsAffected < 1) { // 실패
    await connection.rollback();
    // await ODBRelease(connection);
    connection = null;
    return {resultCode: 413, message: 'FAIL' };
  }
  
  await connection.commit();
  //await ODBRelease(connection);
  connection = null;
  return {resultCode: 200, message: 'Upload Success'}; //{ resultCode: statusCode.OK };
}

