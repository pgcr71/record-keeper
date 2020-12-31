import { ipcMain, IpcMainEvent } from "electron";
import { Product } from "../entities/product.entity";
import { ProductController } from "../controller/products.controller";

export class ProductListener {
  pr: ProductController = new ProductController();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allProducts", async (event: IpcMainEvent) => {
      try {
        event.returnValue = await this.pr.all({} as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("oneProducts", async (event: IpcMainEvent, product: Product) => {
      try {
        event.returnValue = await this.pr.one({ params: product.id } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("removeProducts", async (event: IpcMainEvent, product: Product) => {
      try {
        event.returnValue = await this.pr.remove({ params: product.id } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("saveProducts", async (event: IpcMainEvent, product: Product) => {
      try {
        event.returnValue = await this.pr.save({ body: product } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });
  }
}
