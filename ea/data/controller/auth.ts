import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as configs from "./configurations";

const secretOrPublicKey = configs.publicKey;

export function verify(req: Request, res: Response, next: NextFunction): void {
  const bearer = req.headers["authorization"];
  const token = bearer && bearer.split(" ")[1];
  if (token) {
    const decodedData = verifyJWT(token, res);
    req.body.decodedData = decodedData;
    next();
  } else {
    res
      .status(401)
      .send({ token: false, authorized: false, message: "You might have cleared your cache. Please log in again" });
  }
}

export function verifyJWT(token: string, res: Response): any {
  try {
    return jwt.verify(token, secretOrPublicKey);
  } catch {
    res.status(401).send({ token: true, authorized: false, message: "Your session has expired. Please log in again" });
  }
}

export function signToken(userInfo: string | Buffer): any {
  return jwt.sign(userInfo, secretOrPublicKey, { expiresIn: "1h" });
}
