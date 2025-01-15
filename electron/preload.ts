import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...

  // Specific update-related methods
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  downloadUpdate: () => ipcRenderer.invoke('download-update'),
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),

  // Update event listeners
  onUpdateAvailable: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => 
    ipcRenderer.on('update-available', callback),
  onUpdateNotAvailable: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => 
    ipcRenderer.on('update-not-available', callback),
  onDownloadProgress: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => 
    ipcRenderer.on('download-progress', callback),
  onUpdateDownloaded: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => 
    ipcRenderer.on('update-downloaded', callback),
  onUpdateError: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => 
    ipcRenderer.on('update-error', callback)
});
