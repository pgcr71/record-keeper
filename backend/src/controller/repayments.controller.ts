import { getRepository, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { Repayment } from "../entities/repayment.entity";

export class RepaymentController implements IRepository<Repayment> {
  repository: Repository<Repayment> = getRepository(Repayment);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Repayment[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Repayment | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Repayment> {
    const repaymentToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(repaymentToRemove as Repayment);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<any> {
    return await this.repository.save(request.body)
  }

  public async getUserRepaymentDetails(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository
      .createQueryBuilder("repayment")
      .where("repayment.user_id =:userId", { userId: request.params.id })
      .getMany();
  }
}
