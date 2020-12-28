import { Order } from "../";
import { getRepository, InsertResult, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { ipcMain } from "electron";

export class OrderRepository implements IRepository<Order> {
  repository: Repository<Order> = getRepository(Order);
  public async all(): Promise<Order[]> {
    return this.repository.find();
  }

  public async one(params: Order): Promise<Order> {
    return this.repository.findOne(params.id) as Promise<Order>;
  }

  public async remove(params: Order): Promise<Order> {
    return this.repository.findOne(params) as Promise<Order>;
  }

  public async save(params: Order): Promise<InsertResult> {
    return this.repository.insert(params);
  }

  public async subscribe(): Promise<void> {
    ipcMain.on("getAll", async (event: any) => {
      event.returnValue = await this.all();
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
