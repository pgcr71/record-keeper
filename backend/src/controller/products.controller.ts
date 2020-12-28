import { getRepository, InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { IRepository } from "./repository.interface";
import { Product } from "../entities/product.entity";
import {NextFunction, Request, Response} from "express";
import { InterestTypes } from "../entities/interest_types";

export class ProductController implements IRepository<Product> {
  repository: Repository<Product> = getRepository(Product);

  public async all(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository.createQueryBuilder('product').leftJoinAndSelect('product.InterestType','interest_type').getMany()
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Product> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Product> {
    let productToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(productToRemove);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
  //  let interest_type =  new InterestTypes();
  //   interest_type = request.body.interestTypeId;
  //   const product = {...request.body, ...{InterestType: interest_type}}
  //   console.log(product)
    return this.repository.insert(request.body);
  }
}
