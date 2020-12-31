import { NextFunction, Request, Response } from "express";
import { InsertResult, SelectQueryBuilder } from "typeorm";

export interface IRepository<T> {
  all(request: Request, response: Response, next: NextFunction): Promise<T[]> | Promise<SelectQueryBuilder<T>>;
  one(request: Request, response: Response, next: NextFunction): Promise<T | undefined>;
  save(request: Request, response: Response, next: NextFunction): Promise<InsertResult | undefined>;
  remove(request: Request, response: Response, next: NextFunction): Promise<T | undefined>;
}
