import { Order } from "..";
import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";

export class OrderController implements IRepository<Order> {
  repository: Repository<Order> = getRepository(Order);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Order[]> {
    return this.repository
      .createQueryBuilder("order")
      .select(["usr.first_name", "usr.last_name", "usr.phone_number", "order", "prdt", "it"])
      .leftJoin("order.user", "usr")
      .leftJoin("order.product", "prdt")
      .leftJoin("prdt.interest_type", "it")
      .getMany();
  }

  public async getOrdersByUserId(request: Request, response: Response, next: NextFunction): Promise<Order[]> {
    return this.repository
      .createQueryBuilder("order")
      .select(["usr.first_name", "usr.last_name", "usr.phone_number", "order", "prdt", "it"])
      .leftJoin("order.user", "usr")
      .leftJoin("order.product", "prdt")
      .leftJoin("prdt.interest_type", "it")
      .where("usr.id=:userId", { userId: request.params.userId })
      .orderBy("order.ordered_on", "ASC")
      .getMany()
      .then((results) =>
        results.map((result) =>
          result.product.interest_type.name === "compound"
            ? this.calculateCompoundInterest(result)
            : this.calculateSimpleInterest(result),
        ),
      );
  }

  calculateSimpleInterest(result: Order, date?: Date | string): Order {
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = new Date(result.ordered_on).setHours(23, 59, 59, 999);
    const date2 = date ? new Date(date).setHours(23, 59, 59, 999) : new Date().setHours(23, 59, 59, 999);
    result.days_since_purchase = Math.round(Math.abs((date1 - date2) / oneDay));
    result.initial_cost = result.product.unit_price * result.quantity;
    const interestRate = result.product.rate_of_interest;
    result.interest_for_remaining_days = (result.days_since_purchase * result.initial_cost * interestRate * 12) / 36500;
    result.total_debt = result.initial_cost + result.interest_for_remaining_days;
    return result;
  }

  calculateCompoundInterest(result: Order, date?: Date | string): Order {
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = new Date(result.ordered_on).setHours(23, 59, 59, 999);
    const date2 = new Date().setHours(23, 59, 59, 999);
    result.days_since_purchase = Math.round(Math.abs((date1 - date2) / oneDay));
    result.initial_cost = result.product.unit_price * result.quantity;
    const interestRate = result.product.rate_of_interest;
    const compoundingPeriodInDays = 365;
    const timesToCompound = Math.floor(result.days_since_purchase / compoundingPeriodInDays);
    const compoundingMonthsPerYear = Math.floor(365 / compoundingPeriodInDays);
    result.remaining_days = result.days_since_purchase - timesToCompound * compoundingPeriodInDays;
    result.total_with_interest_on_compound_period =
      result.initial_cost * Math.pow(1 + (interestRate * 12) / (compoundingMonthsPerYear * 100), timesToCompound);
    result.interest_on_compound_period = result.total_with_interest_on_compound_period - result.initial_cost;
    result.interest_for_remaining_days =
      (result.remaining_days * result.total_with_interest_on_compound_period * interestRate * 12) / 36500;
    result.total_debt = result.total_with_interest_on_compound_period + result.interest_for_remaining_days;

    return result;
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Order | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Order> {
    const orderToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(orderToRemove as Order);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.insert(request.body);
  }

  public async getTotalOrdersByProductId(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<{ sold: number }> {
    return this.repository
      .createQueryBuilder("order")
      .select("SUM(quantity)", "sold")
      .where("order.product_id=:productId", { productId: request.params })
      .getRawOne();
  }
}
