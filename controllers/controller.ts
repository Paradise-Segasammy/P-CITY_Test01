import express, { Request, Response, NextFunction } from 'express';

import { uploadBetInfo }  from '../../services/rfid/uploadBetInfoService'
import { readBetInfo }  from '../../services/rfid/readBetInfoService'

// 예시

export const readRfidController = async(req: Request, res:Response) => {
  try {
    const result: any = await readBetInfo();
    console.log(result);
    if (result.resultCode === 200) {
      return {resultCode: 200, message: 'success' };
    } else return 300;
  } catch (e: any) {
    console.log(e.message);
  }
}


export const uploadRfidController = async(req: Request, res: Response) => {
  let VO = req.body;

  // uploadBetInfo(params)
  const params = {
    TABLE_ID: VO.TABLE_ID,
    SEAT_NO: VO.SEAT_NO,
    BET_P: VO.BET_P,
    BET_B: VO.BET_B,
    BET_T: VO.BET_T,
    BET_PP: VO.BET_PP,
    BET_BP: VO.BET_BP,
    ORG_AMT: VO.ORG_AMT,
    TIE_AMT: VO.TIE_AMT,
    PAIR_AMT: VO.PAIR_AMT,
    ORG_GBN: VO.ORG_GBN,
    TIE_GBN: VO.TIE_GBN,
    PAIR_GBN: VO.PAIR_GBN,
    BET_LS: VO.BET_LS,
    LUCKY6_GBN: VO.LUCKY6_GBN,
    LUCKY6_AMT: VO.LUCKY6_AMT,
  };
  /*
  try {
    if (!params.BRANCH_CD) {
      //return ResponseUtil.FAIL
      return {resultCode: 400};
    } // and 나머지 3
*/
  try {
    const data: any = await uploadBetInfo(params);
    console.log(data);
    if (data.resultCode === 200) {
      return 200;
    } else return 300;
  } catch (e: any) {
    console.log(e.message);
  }
}

