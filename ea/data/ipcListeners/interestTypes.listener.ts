import { InterestTypesController } from "../controller/interest_types.controller";
import { ipcMain, IpcMainEvent } from "electron";
import { InterestTypes } from "../entities/interest_types.entity";

export class InterestTypesListener {
  pr: InterestTypesController = new InterestTypesController();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allInterestTypes", async (event: IpcMainEvent) => {
      event.returnValue = await this.pr.all();
    });

    ipcMain.on("oneInterestTypes", async (event: IpcMainEvent, InterestType: InterestTypes) => {
      event.returnValue = await this.pr.one({ params: InterestType.id } as never);
    });

    ipcMain.on("removeInterestTypes", async (event: IpcMainEvent, InterestType: InterestTypes) => {
      event.returnValue = await this.pr.remove({ params: InterestType.id } as never);
    });

    ipcMain.on("saveInterestTypes", async (event: IpcMainEvent, InterestType: InterestTypes) => {
      event.returnValue = await this.pr.save({ body: InterestType } as never);
    });
  }
}
