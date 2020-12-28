import { getRepository, InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { IRepository } from "./repository.interface";
import {NextFunction, Request, Response} from "express";
import { InterestTypes } from "../entities/interest_types";
import { User } from "../entities/user.entity";

export class UserController implements IRepository<User> {
  repository: Repository<User> = getRepository(User);

  public async all(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository.createQueryBuilder('user')
    .select(['user.first_name', 'user.last_name', 'user.phone_number'])
    .getMany();
  }

  public async getMatchedUsers(request: Request, response: Response, next: NextFunction): Promise<any> {
    console.log(request.params.searchTerm);
    return this.repository.createQueryBuilder('user')
      .select(['user.first_name', 'user.last_name', 'user.phone_number'])
      .where('user.first_name like :name', { name: request.params.searchTerm })
      .orWhere('user.last_name like :name', { name: request.params.searchTerm })
      .orWhere('user.phone_number like :phoneNumber', { phoneNumber: request.params.searchTerm })
      .getMany()
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<User> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<User> {
    let UserToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(UserToRemove);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
  //  let interest_type =  new InterestTypes();
  //   interest_type = request.body.interestTypeId;
  //   const User = {...request.body, ...{InterestType: interest_type}}
  //   console.log(User)
    return this.repository.insert(request.body);
  }
}
