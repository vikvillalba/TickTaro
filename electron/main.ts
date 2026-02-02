import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')


export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width:376,
    height:497,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  ipcMain.on('resize-window', (e, width, height) => {
    win?.setSize(width,height)
  })

  // change the app mode when it loses focus
  const checkScreenPosition = () => {
    if(!win) return;

    const windowBounds = win.getBounds() // get screen xy
    const currentDisplay = screen.getDisplayMatching(windowBounds) // en que pantalla está la ventana
    const primaryDisplay = screen.getPrimaryDisplay() // get main screen

    const isSecondaryScreen = currentDisplay.id !== primaryDisplay.id
    win.webContents.send('screen-change', isSecondaryScreen)
    
  }

  let moveTimer: NodeJS.Timeout | null = null;

  const handleMove = () => {
      if (moveTimer) clearTimeout(moveTimer);
      moveTimer = setTimeout(() => {
          checkScreenPosition();
      }, 100); // Espera 100ms
  };
  win.on('move',handleMove)
  win.on('focus', checkScreenPosition)

  win.setAlwaysOnTop(true, 'floating')
  win.setWindowButtonVisibility(false)


  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// handler for the closing button from the front
ipcMain.on('close-window', () => {
  const currentWindow = BrowserWindow.getFocusedWindow()
  if(currentWindow){
    currentWindow.close()
  }

})

// handler for the minimizing button from the front
ipcMain.on('minimize-window', () => {
  const currentWindow = BrowserWindow.getFocusedWindow()
  if(currentWindow){
    currentWindow.minimize()
  }

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)



