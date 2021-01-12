import { Order } from "..";
import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { PaymentStatus } from "../entities/payment_statuses.entity";

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
        results.map((result) => {
          return result.product.interest_type.name === "compound"
            ? this.calculateCompoundInterest(result)
            : this.calculateSimpleInterest(result);
        }),
      );
  }

  calculateSimpleInterest(result: Order, endDate?: Date | string | number, startDate?: Date | string | number): Order {
    const oneDay = 24 * 60 * 60 * 1000,
      orderedOnAsDate = new Date(result.ordered_on),
      startDateAsDate = new Date(startDate || result.ordered_on),
      endDateAsDate = endDate ? new Date(endDate) : new Date(),
      today = new Date(),
      lastPaymentDateAsDate = new Date(result.last_payment_date),
      sd = orderedOnAsDate.getTime() > startDateAsDate.getTime() ? orderedOnAsDate : startDateAsDate,
      ed = endDateAsDate ? endDateAsDate : today;

    result.initial_cost = Number(result.product.unit_price) * Number(result.quantity);
    let principal = result.initial_cost,
      date1 = sd.setHours(23, 59, 59, 999),
      date2 = ed.setHours(23, 59, 59, 999);

    const interestRate = Number(result.product.rate_of_interest);

    if (result.payment_status.id === 2) {
      principal = Number(result.remaining_pricipal_debt);
    }

    if (result.payment_status.id === 3) {
      date1 = orderedOnAsDate.setHours(23, 59, 59, 999);
      date2 = lastPaymentDateAsDate.setHours(23, 59, 59, 999);
    }

    result.days_since_purchase = Math.round(Math.abs((date1 - date2) / oneDay));
    result.interest_for_remaining_days = (result.days_since_purchase * principal * interestRate * 12) / 36500;

    result.total_debt = principal + result.interest_for_remaining_days;

    if (result.payment_status.id == 1) {
      result.remaining_pricipal_debt = result.initial_cost;
      result.remaining_interest_debt = result.interest_for_remaining_days;
    }

    if (result.payment_status.id == 2) {
      result.remaining_interest_debt = result.interest_for_remaining_days;
    }
    return result;
  }

  calculateCompoundInterest(
    result: Order,
    endDate?: Date | string | number,
    startDate?: Date | string | number,
  ): Order {
    console.log(result, endDate, startDate);
    const oneDay = 24 * 60 * 60 * 1000,
      orderedOnAsDate = new Date(result.ordered_on),
      startDateAsDate = new Date(startDate || result.ordered_on),
      endDateAsDate = endDate ? new Date(endDate) : new Date(),
      today = new Date(),
      lastPaymentDateAsDate = new Date(result.last_payment_date),
      sd = orderedOnAsDate.getTime() > startDateAsDate.getTime() ? orderedOnAsDate : startDateAsDate,
      ed = endDateAsDate ? endDateAsDate : today,
      interestRate = result.product.rate_of_interest,
      compoundingPeriodInDays = 365;
    result.initial_cost = result.product.unit_price * result.quantity;
    let principal = result.initial_cost,
      date1 = sd.setHours(23, 59, 59, 999),
      date2 = ed.setHours(23, 59, 59, 999);

    if (result.payment_status.id == 3) {
      result.remaining_pricipal_debt = 0;
      result.remaining_interest_debt = 0;
      date1 = orderedOnAsDate.setHours(23, 59, 59, 999);
      date2 = lastPaymentDateAsDate.setHours(23, 59, 59, 999);
    }

    if (result.payment_status.id == 2) {
      principal = result.remaining_pricipal_debt;
    }

    result.days_since_purchase = Math.round(Math.abs((date1 - date2) / oneDay));

    const timesToCompound = Math.floor(result.days_since_purchase / compoundingPeriodInDays);
    const compoundingMonthsPerYear = Math.floor(365 / compoundingPeriodInDays);
    result.remaining_days = result.days_since_purchase - timesToCompound * compoundingPeriodInDays;
    result.total_with_interest_on_compound_period =
      principal * Math.pow(1 + (interestRate * 12) / (compoundingMonthsPerYear * 100), timesToCompound);

    result.interest_on_compound_period = result.total_with_interest_on_compound_period - principal;
    result.interest_for_remaining_days =
      (result.remaining_days * result.total_with_interest_on_compound_period * interestRate * 12) / 36500;
    result.total_debt = result.total_with_interest_on_compound_period + result.interest_for_remaining_days;

    if (result.payment_status.id == 1) {
      result.remaining_pricipal_debt = result.initial_cost;
      result.remaining_interest_debt = result.interest_for_remaining_days + result.interest_on_compound_period;
    }

    if (result.payment_status.id == 2) {
      result.remaining_interest_debt = result.interest_for_remaining_days + result.interest_on_compound_period;
    }

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
    const paymentStatus = new PaymentStatus();
    paymentStatus.id = 1;
    return this.repository.insert({ ...request.body, ...{ payment_status: paymentStatus } });
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
