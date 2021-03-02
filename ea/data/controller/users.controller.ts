import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import { OrderController } from "./orders.controller";

export class UserController implements IRepository<User> {
  repository: Repository<User> = getRepository(User);

  public async all(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository
      .createQueryBuilder("user")
      .select(["user.id", "user.first_name", "user.last_name", "user.phone_number", "user.updated_on"])
      .getMany();
  }

  public async getMatchedUsers(request: Request, response: Response, next: NextFunction): Promise<any> {
    console.log(request.params.searchTerm);
    return this.repository
      .createQueryBuilder("user")
      .select(["user.first_name", "user.last_name", "user.phone_number"])
      .where("user.first_name like :name", { name: request.params.searchTerm })
      .orWhere("user.last_name like :name", { name: request.params.searchTerm })
      .orWhere("user.phone_number like :phoneNumber", { phoneNumber: request.params.searchTerm })
      .getMany();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<User | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<User> {
    const UserToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(UserToRemove as User);
  }

  public async getUserOrdersAndRepayments(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<any | undefined> {
    return this.repository
      .createQueryBuilder("usr")
      .select([
        "usr.first_name",
        "usr.last_name",
        "usr.phone_number",
        "order",
        "rp",
        "prdt",
        "it"
      ])
      .leftJoin("usr.orders", "order")
      .leftJoin("usr.repayments", "rp")
      .leftJoin("order.product", "prdt")
      .leftJoin("prdt.interest_type", "it")
      .where("usr.id=:userId", { userId: request.params.id })
      .getMany()
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.save(request.body);
  }
}
