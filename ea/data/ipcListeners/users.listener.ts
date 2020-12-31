import { ipcMain, IpcMainEvent } from "electron";
import { User } from "../entities/user.entity";
import { UserController } from "../controller/users.controller";

export class UserListener {
  pr: UserController = new UserController();
  repository = this.pr.repository;

  public async listen(): Promise<void> {
    ipcMain.on("allUsers", async (event: IpcMainEvent) => {
      event.returnValue = await this.pr.all({} as never, {} as never, {} as never);
    });

    ipcMain.on("oneUsers", async (event: IpcMainEvent, user: User) => {
      event.returnValue = await this.pr.one({ params: user.id } as never, {} as never, {} as never);
    });

    ipcMain.on("removeUsers", async (event: IpcMainEvent, user: User) => {
      event.returnValue = await this.pr.remove({ params: user.id } as never, {} as never, {} as never);
    });

    ipcMain.on("saveUsers", async (event: IpcMainEvent, user: User) => {
      event.returnValue = await this.pr.save({ body: user } as never, {} as never, {} as never);
    });

    ipcMain.on("getUserOrdersAndRepayments", async (event: IpcMainEvent, data: any) => {
      try {
        event.returnValue = await this.pr.getUserOrdersAndRepayments(
          { params: data } as never,
          {} as never,
          {} as never,
        );
      } catch (err) {
        event.returnValue = err;
      }
    });
  }
}
