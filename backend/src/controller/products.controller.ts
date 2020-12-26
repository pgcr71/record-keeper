import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { Product } from "../entities/product.entity";
import {NextFunction, Request, Response} from "express";

export class ProductController implements IRepository<Product> {
  repository: Repository<Product> = getRepository(Product);

  public async all(request: Request, response: Response, next: NextFunction): Promise<Product[]> {
    return this.repository.find();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Product> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Product> {
    let productToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(productToRemove);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    return this.repository.insert(request.body);
  }
}
