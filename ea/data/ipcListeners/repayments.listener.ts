import { RepaymentController } from "../controller/repayments.controller";
import { ipcMain, IpcMainEvent } from "electron";
import { Repayment } from "../entities/repayment.entity";

export class RepaymentsListener {
  pr: RepaymentController = new RepaymentController();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allRepayments", async (event: IpcMainEvent) => {
      try {
        event.returnValue = await this.pr.all({} as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("oneRepayments", async (event: IpcMainEvent, repayment: Repayment) => {
      try {
        event.returnValue = await this.pr.one({ params: repayment.id } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("removeRepayments", async (event: IpcMainEvent, repayment: Repayment) => {
      try {
        event.returnValue = await this.pr.remove({ params: repayment.id } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });

    ipcMain.on("saveRepayments", async (event: IpcMainEvent, repayment: Repayment) => {
      try {
        event.returnValue = await this.pr.save({ body: repayment } as never, {} as never, {} as never);
      } catch (err) {
        event.returnValue = err;
      }
    });
  }
}
