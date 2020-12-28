import { ipcMain, IpcMainEvent } from "electron";
import { InterestTypes } from "../entities/interest_types.entity";
import { InterestTypesRepository } from "../repositories/interestTypes.repository";

export class InterestTypesListener {
  pr: InterestTypesRepository = new InterestTypesRepository();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allInterestTypes", async (event: IpcMainEvent) => {
      event.returnValue = await this.pr.all();
    });

    ipcMain.on("oneInterestTypes", async (event: IpcMainEvent, InterestType: InterestTypes) => {
      event.returnValue = await this.pr.one(InterestType);
    });

    ipcMain.on("removeInterestTypes", async (event: IpcMainEvent, InterestType: InterestTypes) => {
      await this.pr.remove(InterestType);
    });

    ipcMain.on("saveInterestTypes", async (event: IpcMainEvent, InterestType: InterestTypes) => {
      await this.pr.save(InterestType);
    });
  }
}
