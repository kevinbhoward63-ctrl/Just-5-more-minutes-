const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktop", {
  promptStart: () => ipcRenderer.send("prompt-start"),
  promptEnd: () => ipcRenderer.send("prompt-end"),
  onSpace: (cb) => ipcRenderer.on("space-yes", () => cb())
});
