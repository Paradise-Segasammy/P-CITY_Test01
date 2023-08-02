import express, { Request, Response, NextFunction } from 'express';

import { insertMember } from '../services/insertMemberService';
import { selectMember } from '../services/selectMemberService';

export const readMember = async(req: Request, res: Response) => {
  let VO = req.body;
  let result = selectMember();
  res.json(result);
}

//(USER_ID, USER_PW, CUST_NO, NAME, TEL, ADDRESS, EMAIL, BIRTHDAY,
export const uploadMember = async(req: Request, res:Response) => {
  let VO = req.body;
  const params = {
    USER_ID: VO.USER_ID,
    USER_PW: VO.USER_PW,
    CUST_NO: VO.CUST_NO,
    NAME: VO.NAME,
    TEL: VO.TEL,
    ADDRESS: VO.ADDRESS,
    EMAIL: VO.EMAIL,
    BIRTHDAY: VO.BIRTHDAY
  }
  
  try {
    const result: any =  insertMember(params);
    console.log(result);
    if (result.resultCode === 200) {
      res.json(result.detail);
      return 200;
    } else {
      res.json(result);
      return 400;
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

