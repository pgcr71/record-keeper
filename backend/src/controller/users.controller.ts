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
      .select(["user.id", "user.first_name", "user.last_name", "user.phone_number"])
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
  ): Promise<User | undefined> {
    const orderController = new OrderController();
    const date = request.params.date;
    return this.repository
      .createQueryBuilder("usr")
      .select([
        "usr.first_name",
        "usr.last_name",
        "usr.phone_number",
        "order",
        "prdt",
        "it",
        "repayment",
        "paymentStatus",
      ])
      .leftJoin("usr.orders", "order")
      .leftJoin("usr.repayments", "repayment")
      .leftJoin("order.product", "prdt")
      .leftJoin("order.payment_status", "paymentStatus")
      .leftJoin("prdt.interest_type", "it")
      .where("usr.id=:userId", { userId: request.params.id })
      .andWhere("paymentStatus.id!=:notPaidId", { notPaidId: 3 })
      .orderBy("order.ordered_on", "ASC")
      .getOne()
      .then((results) => {
        if (!results) {
          return results;
        }
        results.orders = results.orders.map((result) =>
          result.product.interest_type.name === "compound"
            ? orderController.calculateCompoundInterest(result, date)
            : orderController.calculateSimpleInterest(result, date),
        );
        return results;
      });
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    //  let interest_type =  new InterestTypes();
    //   interest_type = request.body.interestTypeId;
    //   const User = {...request.body, ...{InterestType: interest_type}}
    //   console.log(User)
    return this.repository.insert(request.body);
  }
}
