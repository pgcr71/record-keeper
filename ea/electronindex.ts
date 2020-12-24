// eslint-disable-next-line @typescript-eslint/no-var-requires
import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { createConnection } from "typeorm";
import { Order, Product } from "./data";
import { ProductRepository } from "./data/repositories/products.repository";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
  hardResetMethod: "exit",
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow | null;

async function createWindow(): Promise<void> {
  createConnection({
    type: "sqlite",
    synchronize: true,
    logging: true,
    logger: "simple-console",
    database: "./database.sqlite",
    entities: [Order, Product],
  }).then(
    () => {
      return new ProductRepository().subscribed();
    },
    (error) => {
      console.log(error);
      return error;
    },
  );
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // Open the DevTools.

  mainWindow.webContents.openDevTools();
  const currentURL = (mainWindow as BrowserWindow).webContents.getURL();
  console.log(currentURL);
  mainWindow.webContents.on("did-fail-load", () => {
    (mainWindow as BrowserWindow).loadURL(`file://${__dirname}/index.html`);
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
