/// <reference types="vite/client" />

import { ipcRenderer } from "electron";

export {};

declare global {
  interface Window {
    electron: {

      on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
      off: (channel: string, ...args: any[]) => void
      send: (channel: string, ...args: any[]) => void
      invoke: (channel: string, ...args: any[]) => Promise<any>

      onScreenChange: (callback: (isSecondary: boolean) => void) => void
      resizeWindow: (width, height) => void
    };
  }
}