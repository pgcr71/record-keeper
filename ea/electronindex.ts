// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ProductListener } from "./data/ipcListeners/products.listener";
import { app, BrowserWindow, globalShortcut } from "electron";
import { createConnection } from "typeorm";
import { InterestTypesListener } from "./data/ipcListeners/interestTypes.listener";
import { OrderListener } from "./data/ipcListeners/orders.listener";
import { UserListener } from "./data/ipcListeners/users.listener";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const isDev = require("electron-is-dev");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow | null;

async function createWindow(): Promise<void> {
  createConnection({
    type: "sqlite",
    logging: true,
    logger: "simple-console",
    database: `${__dirname}/data/database.sqlite`,
    migrations: [`${__dirname}/data/migrations/*.js`],
    entities: [`${__dirname}/data/entities/*.js`],
  }).then(
    () => {
      new ProductListener().listen();
      new InterestTypesListener().listen();
      new OrderListener().listen();
      new UserListener().listen();
    },
    (error) => {
      return error;
    },
  );
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  // Open the DevTools.

  isDev && mainWindow.webContents.openDevTools();
  mainWindow.maximize();
  mainWindow.webContents.on("did-fail-load", () => {
    (mainWindow as BrowserWindow).loadURL(`file://${__dirname}/dist/index.html`);
    // REDIRECT TO FIRST WEBPAGE AGAIN
  });

  globalShortcut.register("f5", function () {
    (mainWindow as BrowserWindow).reload();
  });
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
