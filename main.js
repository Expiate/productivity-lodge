const { app, BrowserWindow, ipcMain, Notification, IpcMessagesEvent } = require('electron')

let splashScreen;
let win;

function createSplashScreen () {
  // Create the browser window.
  splashScreen = new BrowserWindow({
    width: 800, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  })

  splashScreen.loadURL(`file://${__dirname}/src/splash-screen/splash.html`)
}

function destroySplashScreen() {
  splashScreen.destroy()
}

function createMainWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280, 
    height: 920,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    }

  })

  win.menuBarVisible = false;
  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })

  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

// Create window on electron initialization
app.on('ready', () => {
  createSplashScreen()
  setTimeout(() => {
    createMainWindow()
    destroySplashScreen()
  }, 3000)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createMainWindow()
  }
})

ipcMain.on('popup-signal', (event, arg) => {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
})