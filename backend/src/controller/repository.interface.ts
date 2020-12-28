import {NextFunction, Request, Response} from "express";
import { SelectQueryBuilder } from "typeorm";

export interface IRepository<T> {
  all(request: Request, response: Response, next: NextFunction): Promise<T[]> | Promise<SelectQueryBuilder<T>>;
  one(request: Request, response: Response, next: NextFunction): Promise<T>;
  save(request: Request, response: Response, next: NextFunction)
  remove(request: Request, response: Response, next: NextFunction)
}
