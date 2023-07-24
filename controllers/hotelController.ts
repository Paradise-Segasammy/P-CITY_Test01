import express, { Request, Response, NextFunction } from 'express';

import { insertMember }  from '../services/insertMemberService';

export const hotelController = async(req: Request, res:Response) => {
  let VO = req.body;

  // uploadBetInfo(params)
  const params = {
    USER_ID: VO.USER_ID,
    USER_PW: VO.USER_PW,
    CUST_NO: VO.CUST_NO,
    NAME: VO.NAME,
    TEL: VO.TEL,
    ADDRESS: VO.ADDRESS,
    EMAIL: VO.EMAIL,
    BIRTHDAY: VO.BIRTHDAY,
  };

  if(!params.USER_ID) {
    res.send();
    return { resultCode: 400 };
  }
  
  try {
    const result: any = await insertMember();
    if (result.resultCode === 200) {
      res.json(result);
      res.send(res);
    } else {
      res.send(res);
      return 300;
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

