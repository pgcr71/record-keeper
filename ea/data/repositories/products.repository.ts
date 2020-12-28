import { getRepository, InsertResult, ObjectID, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { Product } from "../entities/product.entity";

export class ProductRepository implements IRepository<Product> {
  public repository: Repository<Product> = getRepository(Product);

  public async all(): Promise<Product[]> {
    return this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.InterestType", "interest_type")
      .getMany();
  }

  public async one(params: Product): Promise<Product> {
    return this.repository.findOne(params.id) as Promise<Product>;
  }

  public async remove(params: { id: string | number | Date | ObjectID | undefined }): Promise<Product> {
    const productToRemove = await this.repository.findOne(params.id);
    return ((await this.repository.remove(productToRemove as Product)) as unknown) as Promise<Product>;
  }

  public async save(product: Product): Promise<InsertResult> {
    return this.repository.insert(product);
  }
}
