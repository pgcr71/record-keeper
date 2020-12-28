import { ProductRepository } from "../repositories/products.repository";
import { ipcMain, IpcMainEvent } from "electron";
import { Product } from "../entities/product.entity";

export class ProductListener {
  pr: ProductRepository = new ProductRepository();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allProducts", async (event: IpcMainEvent) => {
      event.returnValue = await this.pr.all();
    });

    ipcMain.on("oneProducts", async (event: IpcMainEvent, product: Product) => {
      event.returnValue = await this.pr.one(product);
    });

    ipcMain.on("removeProducts", async (event: IpcMainEvent, Product: Product) => {
      event.returnValue = await this.pr.remove(Product);
    });

    ipcMain.on("saveProducts", async (event: IpcMainEvent, Product: Product) => {
      event.returnValue = await this.pr.save(Product);
    });
  }
}
