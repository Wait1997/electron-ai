import { app, BrowserWindow } from "electron";
import path from "path";

// 获取项目根路径
process.env.APP_ROOT = path.join(__dirname, "../..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

let win: BrowserWindow | null = null;
const preload = path.join(__dirname, "../preload/index.js");
const indexHtml = path.join(RENDERER_DIST, "index.html");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

// const appSize = {
//   width: 800,
//   height: 600,
//   maxChatContentHeight: 0,
// } as const;

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload: preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    // 开发环境
    win.loadURL(VITE_DEV_SERVER_URL);
    // 开发环境控制面板
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
