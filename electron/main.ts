import { app, BrowserWindow } from 'electron';
import 'source-map-support/register';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFile, ChildProcess } from 'child_process';
import find from 'find-process';
import kill from 'tree-kill';
import {updateElectronApp} from 'update-electron-app';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Define environment paths
process.env.APP_ROOT = path.join(__dirname, '..');
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;
let serverProcess: ChildProcess | null = null;
let parentPID : number | undefined;
let childProcess : any[] = [];
let childProcessPID : number | undefined;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.resourcesPath, 'resources', 'yactraq.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load renderer content
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });
} 

updateElectronApp({
  repo: 'https://github.com/Tranzub/rtac-client-autoupdate.git',
  updateInterval: '5 minutes', // Interval to check for updates
  // logger: require('electron-log') // Optional: Use electron-log for logging
});

function startServer() {
  console.log("start server")
    const serverPath = path.join(process.resourcesPath, 'resources', 'app.exe');
    serverProcess = execFile(serverPath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting Python server: ${error.message}`);
        app.quit(); // Exit the app if the server fails to start
        return;
      }
      console.log(`Server stdout: ${stdout}`);
      if (stderr) {
        console.error(`Server stderr: ${stderr}`);
      }
    });

    parentPID = serverProcess.pid;
    // console.log(global.parentPID)
 
    find('name', 'app.exe')
      .then((list) => {
        childProcess = list.filter((process) => process.ppid === parentPID);
        // console.log(global.childProcess)
        //buggy line below change in next iteration
        childProcessPID = childProcess[0].pid;
      });
 
    // Handle unexpected server process exit
    serverProcess.on('exit', (code) => {
      console.log(`Server process exited with code ${code}`);
      if (code !== 0) {
        console.error('Python server crashed. Closing the app.');
        app.quit(); // Close the app if the server crashes
      }
    });

}


function stopServer() {
    if (parentPID) {
      // Use tree-kill to terminate entire process tree
      kill(childProcessPID!, 'SIGTERM', (err) => {
        if (err) {
          console.error('Failed to kill server process', err);
        } else {
          console.log('Server process terminated');
        }
      });
    
      kill(parentPID, 'SIGTERM', (err) => {
        if (err) {
          console.error('Failed to kill server process', err);
        } else {
          console.log('Server process terminated');
        }
      });
    } else {
    console.log('no server pid found')
     // just a saftey measure to fall on previous stop server
     if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }}
}


// function stopServer() {
//   if (serverProcess) {
//     serverProcess.kill();
//     serverProcess = null;
//   }
// }

// App lifecycle management
app.on('ready', () => {
  startServer();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopServer();
    app.quit();
  }
});

app.on('will-quit', () => {
  stopServer();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
