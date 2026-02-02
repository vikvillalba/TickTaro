import { ipcMain, BrowserWindow, app, screen } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 376,
    height: 497,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  ipcMain.on("resize-window", (e, width, height) => {
    win == null ? void 0 : win.setSize(width, height);
  });
  const checkScreenPosition = () => {
    if (!win) return;
    const windowBounds = win.getBounds();
    const currentDisplay = screen.getDisplayMatching(windowBounds);
    const primaryDisplay = screen.getPrimaryDisplay();
    const isSecondaryScreen = currentDisplay.id !== primaryDisplay.id;
    win.webContents.send("screen-change", isSecondaryScreen);
  };
  let moveTimer = null;
  const handleMove = () => {
    if (moveTimer) clearTimeout(moveTimer);
    moveTimer = setTimeout(() => {
      checkScreenPosition();
    }, 100);
  };
  win.on("move", handleMove);
  win.on("focus", checkScreenPosition);
  win.setAlwaysOnTop(true, "floating");
  win.setWindowButtonVisibility(false);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.on("close-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.close();
  }
});
ipcMain.on("minimize-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.minimize();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
