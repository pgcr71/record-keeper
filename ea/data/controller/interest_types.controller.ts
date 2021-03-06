import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { InterestTypes } from "../entities/interest_types.entity";

export class InterestTypesController implements IRepository<InterestTypes> {
  repository: Repository<InterestTypes> = getRepository(InterestTypes);

  public async all(request: Request, response: Response, next: NextFunction): Promise<InterestTypes[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<InterestTypes | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<InterestTypes | undefined> {
    const InterestTypesToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(InterestTypesToRemove as InterestTypes);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.insert(request.body);
  }
}
