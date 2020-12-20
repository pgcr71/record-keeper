import { Order } from "../";
import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { ipcMain } from "electron";
import { Product } from "electron/main";

export class OrderRepository implements IRepository<Order> {
  repository: Repository<Order> = getRepository(Order);
  public async getAll(): Promise<Order[]> {
    return this.repository.find();
  }

  public async getOne(params: Order): Promise<Order[]> {
    return this.repository.find(params);
  }

  public async deleteOne(params: Order): Promise<Order[]> {
    return this.repository.find(params);
  }

  public async insertOne(params: Order): Promise<InsertResult> {
    return this.repository.insert(params);
  }

  public async subscribe(): Promise<void> {
    ipcMain.on("getAll", async (event: any, ...args: any[]) => {
      event.returnValue = await this.getAll();
    });

    ipcMain.on("addOne", async (event: any, order: Order) => {
      const _order = await this.repository.create(order);
      await this.repository.save(_order);
      event.returnValue = await this.repository.find();
    });

    ipcMain.on("deleteOne", async (event: any, order: Order) => {
      const _order = await this.repository.create(order);
      await this.repository.remove(_order);
      event.returnValue = await this.repository.find();
    });
  }
}
