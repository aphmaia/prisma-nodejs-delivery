import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as dotenv from 'dotenv';

interface IPayload {
  sub: string;
}



export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {

    const authHearder = request.headers.authorization;

    if(!authHearder){
      return response.status(401).json({
        message: "Token missing!",
      });
    }

    const [, token] = authHearder.split(" ");

    dotenv.config(); 

    try {

      const { sub } = verify(token, String(process.env.AUTHENTICATE_KEY_DELIVERYMAN)) as IPayload;

      request.id_deliveryman = sub;

      return next();

    }
    catch(err){
      return response.status(401).json({
        message: "Invalid token!",
      });
    }



  
}