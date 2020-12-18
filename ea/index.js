const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path')
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      frame: false
    }
  })

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on("did-fail-load", () => {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    // REDIRECT TO FIRST WEBPAGE AGAIN
  });

  globalShortcut.register('f5', function() {
		mainWindow.reload();
	});
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


