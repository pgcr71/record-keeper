import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { NextFunction, Request, Response } from "express";
import { PaymentStatus } from "../entities/payment_statuses.entity";
import { Order } from "../entities/order.entity";

export class OrderController implements IRepository<Order> {
  repository: Repository<Order> = getRepository(Order);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Order[]> {
    return this.repository
      .createQueryBuilder("order")
      .select(["usr.first_name", "usr.last_name", "usr.phone_number", "order", "prdt", "it", "its"])
      .leftJoin("order.user", "usr")
      .leftJoin("order.product", "prdt")
      .leftJoin("order.interest_type", "its")
      .leftJoin("prdt.interest_type", "it")
      .where("usr.id=:userId", { userId: request.params.userId })
      .getMany();
  }

  public async getOrdersByUserId(request: Request, response: Response, next: NextFunction): Promise<[Order[], number]> {
    return this.repository
      .createQueryBuilder("order")
      .select(["usr.first_name", "usr.last_name", "usr.phone_number", "order", "prdt", "it"])
      .leftJoin("order.user", "usr")
      .leftJoin("order.product", "prdt")
      .leftJoin("prdt.interest_type", "it")
      .where("usr.id=:userId", { userId: request.params.userId })
      .orderBy("order.ordered_on", "ASC")
      .getManyAndCount();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Order | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Order> {
    const orderToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(orderToRemove as Order);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.save({ ...request.body });
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.save({ ...request.body });
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
