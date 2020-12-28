// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ProductListener } from "./data/ipcListeners/products.listener";
import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { createConnection } from "typeorm";
import { InterestDefaults, InterestTypes, Order, Product, RegistrationStatus, User, UserRoles } from "./data";
import { InterestTypesListener } from "./data/ipcListeners/interestTypes.listener";
import { recordkeeper1609080533162 } from "./data/migrations/1609080533162-recordkeeper";
import { seed1609080652228 } from "./data/migrations/1609080652228-seed";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const isDev = require("electron-is-dev");
if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
  console.log("Running in development");
} else {
  console.log("Running in production");
}

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
    migrationsRun: true,
    migrations: !isDev ? [recordkeeper1609080533162, seed1609080652228] : ["dist/data/migrations/**/*.js"],
    entities: [Order, Product, InterestDefaults, InterestTypes, User, UserRoles, RegistrationStatus],
  }).then(
    () => {
      console.log("connection succesfull");
      new ProductListener().listen();
      new InterestTypesListener().listen();
    },
    (error) => {
      console.log(error);
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

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // Open the DevTools.

  mainWindow.webContents.openDevTools();
  const currentURL = (mainWindow as BrowserWindow).webContents.getURL();
  mainWindow.maximize();
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
