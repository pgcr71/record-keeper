import { getConnection, getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { Savings } from "../entities/savings.entity";

export class SavingsController implements IRepository<Savings> {
  repository: Repository<Savings> = getRepository(Savings);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Savings[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Savings | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Savings> {
    const SavingsToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(SavingsToRemove as Savings);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository
      .createQueryBuilder("savings")
      .where("savings.user_id =:userId", { userId: request.params.id })
      .andWhere("savings IS NULL")
      .getMany();
  }

  public async getUserSavingsDetails(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository
      .createQueryBuilder("savings")
      .select(["savings", "repayment"])
      .leftJoin("savings.repayment", "repayment")
      .where("savings.user_id =:userId", { userId: request.params.id })
      .getMany();
  }
}
