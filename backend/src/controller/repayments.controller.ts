import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { Repayment } from "../entities/repayment.entity";

export class RepaymentController implements IRepository<Repayment> {
  repository: Repository<Repayment> = getRepository(Repayment);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Repayment[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Repayment> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Repayment> {
    let repaymentToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(repaymentToRemove);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    console.log(request)
    return this.repository.insert(request.body);
  }
}
