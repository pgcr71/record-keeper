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
    const date =
      request.params.start_date &&
      request.params.start_date !== "null" &&
      request.params.start_date !== "undefined" &&
      new Date(new Date(request.params.start_date).setHours(0, 0, 1)).toISOString();
    const endDate = request.params.end_date;
    request.params.end_date !== "null" &&
      request.params.end_date !== "undefined" &&
      new Date(new Date(request.params.end_date).setHours(23, 59, 59, 99)).toISOString();
    const allOrders = request.params.allOrders;
    const repo = this.repository
      .createQueryBuilder("usr")
      .select([
        "usr.first_name",
        "usr.last_name",
        "usr.phone_number",
        "order",
        "prdt",
        "it",
        "repayments",
        "paymentStatus",
        "orderRepayment",
      ])
      .leftJoin("usr.orders", "order")
      .leftJoin("order.product", "prdt")
      .leftJoin("order.repayments", "repayments")
      .leftJoin("repayments.payment", "orderRepayment")
      .leftJoin("order.payment_status", "paymentStatus")
      .leftJoin("prdt.interest_type", "it")
      .where("usr.id=:userId", { userId: request.params.id });
    let getOrders: Promise<User> | undefined = undefined;
    if (!allOrders || allOrders === "null" || allOrders === "undefined") {
      getOrders = repo
        .andWhere("paymentStatus.id!=:notPaidId", { notPaidId: 3 })
        .orderBy("order.ordered_on", "ASC")
        .getOne() as Promise<User>;
    }

    if (allOrders) {
      getOrders = repo
        .orderBy("order.ordered_on", "ASC")
        .andWhere("order.ordered_on >= :start_date", { start_date: date })
        .andWhere("order.ordered_on <= :end_date", { end_date: endDate })
        .getOne() as Promise<User>;
    }

    return (
      getOrders &&
      getOrders.then((results) => {
        if (!results) {
          return results;
        }
        results.orders = results.orders.map((result) =>
          result.product.interest_type.name === "compound"
            ? orderController.calculateCompoundInterest(result, endDate as string)
            : orderController.calculateSimpleInterest(result, endDate as string),
        );
        return results;
      })
    );
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    //  let interest_type =  new InterestTypes();
    //   interest_type = request.body.interestTypeId;
    //   const User = {...request.body, ...{InterestType: interest_type}}
    //   console.log(User)
    return this.repository.insert(request.body);
  }
}
