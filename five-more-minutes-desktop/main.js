const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require("path");

let win = null;
let tuckAwayAfter = false;

function releaseSpace() {
  try { globalShortcut.unregister("Space"); } catch (e) {}
}

function createWindow() {
  win = new BrowserWindow({
    width: 1040,
    height: 780,
    minWidth: 420,
    minHeight: 600,
    title: "Five More Minutes",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
      autoplayPolicy: "no-user-gesture-required"
    }
  });
  win.loadFile(path.join(__dirname, "index.html"));
  win.on("closed", () => { win = null; releaseSpace(); });
}

// The page tells us when "Can you do X more minutes?" appears.
ipcMain.on("prompt-start", () => {
  if (!win) return;
  tuckAwayAfter = win.isMinimized() || !win.isVisible() || !win.isFocused();
  if (win.isMinimized()) win.restore();
  win.show();
  win.setAlwaysOnTop(true, "screen-saver");
  win.focus();
  if (process.platform === "darwin") app.focus({ steal: true });
  win.flashFrame(true);

  // While the question is up, Space works even if the OS won't hand us focus.
  releaseSpace();
  try {
    globalShortcut.register("Space", () => {
      if (win) win.webContents.send("space-yes");
    });
  } catch (e) {}
});

// The question was answered (or ran out of time).
ipcMain.on("prompt-end", () => {
  releaseSpace();
  if (!win) return;
  win.flashFrame(false);
  win.setAlwaysOnTop(false);
  if (tuckAwayAfter) win.minimize();
  tuckAwayAfter = false;
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });
  app.whenReady().then(createWindow);
  app.on("will-quit", () => { try { globalShortcut.unregisterAll(); } catch (e) {} });
  app.on("window-all-closed", () => app.quit());
}
