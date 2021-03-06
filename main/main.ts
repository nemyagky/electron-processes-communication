import { app, screen, BrowserWindow } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    height: size.height,
    width: size.width,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    resizable: false,
    frame: false,
  });

  mainWindow.removeMenu();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("scroll-touch-begin", () => {
    mainWindow.webContents.send('scroll-touch-begin');
  })

  mainWindow.on("scroll-touch-end", () => {
    mainWindow.webContents.send('scroll-touch-end');
  })
};


// Fix white screen on app launch
app.on('ready', () => {
  setTimeout(createWindow, 0);
});

// Fix MacOS dock
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Fix double-open
app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

