import { createWindowsInstaller } from 'electron-winstaller';
import * as path from 'path';

async function buildInstaller() {
  try {
    console.log('Creating Windows installer...');
    await createWindowsInstaller({
      appDirectory: path.resolve(__dirname, 'release-builds/RTAC-win32-x64'), // Adjust to your packaged app path
      outputDirectory: path.resolve(__dirname, 'installers'),
      authors: 'Yactraq',
      exe: 'RTAC.exe',
      description: 'RTAC CLIENT',
      name: 'RTAC',
      setupExe: 'RTAC.exe',
      setupIcon: path.resolve(__dirname, 'resources/yactraq.ico'), // Path to your .ico file
      noMsi: true, // Skip MSI creation
    });
    console.log('Windows installer created successfully!');
  } catch (error) {
    console.error('Error creating installer:', error.message || error);
    process.exit(1);
  }
}

buildInstaller();