"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  onScreenChange: (callback) => {
    electron.ipcRenderer.on("screen-change", (_event, value) => callback(value));
  },
  resizeWindow: (width, height) => electron.ipcRenderer.send("resize-window", width, height)
  // You can expose other APTs you need here.
  // ...
});
