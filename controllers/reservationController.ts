import express, { Request, Response, NextFunction } from 'express';

import { makeReservation } from '../services/makeReservationService';


//(USER_ID, USER_PW, CUST_NO, NAME, TEL, ADDRESS, EMAIL, BIRTHDAY,
export const uploadReservation = async(req: Request, res:Response) => {
  let VO = req.body;
  const params = {
    CUST_NO: VO.CUST_NO,
    RMNO: VO.RMNO,
    RES_YN: VO.RES_YN,
    RES_NO: VO.RES_NO,
    RES_DATE: VO.RES_DATE,
  }
  
  try {
    const result: any =  makeReservation(params);
    //console.log(result);
    if (result.resultCode === 200) {
      res.json(result.resultCode);
      return 200;
    } else {
      res.json(result);
      return 400;
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

