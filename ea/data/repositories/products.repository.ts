import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { ipcMain } from "electron";
import { Product } from "../entities/product.entity";
import { IpcMainEvent } from "electron/main";

export class ProductRepository implements IRepository<Product> {
  repository: Repository<Product> = getRepository(Product);

  public async getAll(): Promise<Product[]> {
    return this.repository.find();
  }

  public async getOne(params: Product): Promise<Product[]> {
    return this.repository.find(params);
  }

  public async deleteOne(params: { [str: string]: unknown }): Promise<Product[]> {
    return this.repository.find(params);
  }

  public async addOne(product: Product): Promise<Product> {
    return this.repository.save(product).catch((error) => {
      console.log(error);
      return error;
    });
  }

  public async insertOne(product: Product): Promise<InsertResult> {
    return this.repository.insert(product);
  }

  public async subscribed(): Promise<void> {
    ipcMain.on("getAll", async (event: IpcMainEvent) => {
      event.returnValue = await this.getAll();
    });

    ipcMain.on("addOne", async (event: IpcMainEvent, product: Product) => {
      console.log("invoked");
      console.log(product);
      event.returnValue = await this.addOne(product);
    });

    ipcMain.on("deleteOne", async (event: IpcMainEvent, Product: Product) => {
      await this.repository.delete(Product.id);
    });

    ipcMain.on("updateOne", async (event: IpcMainEvent, Product: Product) => {
      await this.repository.update(Product.id, Product);
    });
  }
}
