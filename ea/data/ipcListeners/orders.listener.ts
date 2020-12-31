import { OrderController } from "../controller/orders.controller";
import { ipcMain, IpcMainEvent } from "electron";
import { Order } from "../entities/order.entity";

export class OrderListener {
  pr: OrderController = new OrderController();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allOrders", async (event: IpcMainEvent) => {
      try {
        event.returnValue = await this.pr.all({} as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("oneOrders", async (event: IpcMainEvent, order: Order) => {
      try {
        event.returnValue = await this.pr.one({ params: order.id } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("removeOrders", async (event: IpcMainEvent, order: Order) => {
      try {
        event.returnValue = await this.pr.remove({ params: order.id } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("saveOrders", async (event: IpcMainEvent, order: Order) => {
      try {
        event.returnValue = await this.pr.save({ body: order } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("userAllOrders", async (event: IpcMainEvent, userId: string) => {
      try {
        event.returnValue = await this.pr.getOrdersByUserId({ params: { userId } } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });
  }
}
