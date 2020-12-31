import { getRepository, InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { IRepository } from "./repository.interface";
import { Product } from "../entities/product.entity";
import { NextFunction, Request, Response } from "express";
import { InterestTypes } from "../entities/interest_types.entity";
import { OrderController } from "./orders.controller";

export class ProductController implements IRepository<Product> {
  repository: Repository<Product> = getRepository(Product);

  public async all(request: Request, response: Response, next: NextFunction): Promise<any> {
    return this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.interest_type", "interest_type")
      .getMany();
  }

  public async one(request: Request, response: Response, next: NextFunction): Promise<Product | undefined> {
    return this.repository.findOne(request.params.id);
  }

  public async remove(request: Request, response: Response, next: NextFunction): Promise<Product> {
    const productToRemove = await this.repository.findOne(request.params.id);
    return await this.repository.remove(productToRemove as Product);
  }

  public async save(request: Request, response: Response, next: NextFunction): Promise<InsertResult> {
    //  let interest_type =  new InterestTypes();
    //   interest_type = request.body.interestTypeId;
    //   const product = {...request.body, ...{InterestType: interest_type}}
    //   console.log(product)
    return this.repository.insert(request.body);
  }

  public async getStockDetails(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<{ quantity: number; sold: number }> {
    return Promise.all([
      new OrderController().getTotalOrdersByProductId(
        { params: request.params.productId } as never,
        {} as never,
        {} as never,
      ),
      (this.repository
        .createQueryBuilder("product")
        .select(["product.quantity"])
        .where("product.id=:productId", { productId: request.params.productId })
        .getOne() as unknown) as Product,
    ]).then((results) => ({ quantity: Number(results[1].quantity), sold: Number(results[0].sold) }));
  }
}
