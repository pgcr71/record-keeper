import { Order } from "..";
import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import {NextFunction, Request, Response} from "express";

export class LoginController implements IRepository<Order> {
  repository: Repository<Order> = getRepository(Order);
  public async all(request: Request, response: Response, next: NextFunction): Promise<Order[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Order> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Order> {
    let orderToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(orderToRemove);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.insert(request.body);
  }
}
