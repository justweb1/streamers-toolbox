import { app, BrowserWindow, screen, Tray, Menu, remote } from 'electron';
import { getDatabase } from './servers/database/database';
import { getAngularUrl } from './modules/utils/utils';
import * as dotenv from 'dotenv';


// Import RxDB
import RxDB, {
  RxDatabase,
  RxCollection,
  RxJsonSchema,
  RxDocument
} from 'rxdb';
import RxDBServerModule from 'rxdb/plugins/server';
import * as pouchdbMemoryAdapter from 'pouchdb-adapter-memory';
RxDB.plugin(RxDBServerModule);
RxDB.plugin(pouchdbMemoryAdapter);

// Import Environment variables
import * as ENV from './src/environments/environment';
import { rxdb } from 'rxdb/dist/typings/plugins/key-compression';

// TODO: Import i18n and setup auto translation.

let win, serve, tray, db, settings, settingsRef;
let closeToTray = true; // TODO: Get this from the user settings.
const logo = `${__dirname}/logo-circle-512x512.png`;
const activeBotCount = 2;
const activeChatSyncCount = 1;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  dotenv.config({
    path: './.env'
  });
} else {
  dotenv.config({
    path: './.env.production'
  });
}
console.log(process.env.NODE_ENV);

// Disables the main menu.
const menu = new Menu();
Menu.setApplicationMenu(null);


const createApp = () => {

  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  console.log('[DATABASE] Settings:', settings);


  // Create the browser window.
  win = new BrowserWindow({
    title: 'Streamers Toolbox',
    icon: logo,
    center: true,
    width: screenSize.width * .8, // TODO: Potentially window size and location settings from user settings.
    height: screenSize.height * .8,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Create the task tray tool
  tray = new Tray(logo); // TODO: Select Icon based on chatsync active

  const trayMenu = Menu.buildFromTemplate([
    { label: 'Dashboard', click: () => {
      win.show();
    }},
    { type: 'separator' },
    { label: 'Todo' }, // TODO: Put window options to open.
    { type: 'separator'},
    { label: 'Quit', click: () => {
      closeToTray = false;
      app.quit();
    }},
  ]);
  tray.setToolTip(`Bots Active: ${activeBotCount}\nChatSyncs Active: ${activeChatSyncCount}`); // TODO: Update this before production.
  tray.setContextMenu(trayMenu);
  tray.on('double-click', () => {
    win.show();
  });

  // Taskbar Menu
  const jumpMenu = Menu.buildFromTemplate([
    { label: 'Streamers Toolbox'}, // TODO: Add app icon
    { label: 'Pin to taskbar'}, // TODO: Add pin icon
    { label: 'Close window'}, // TODO: Add close icon
    { label: 'Quit application'}, // TODO: Add quit icon
  ]);

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.webContents.openDevTools();
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(`${__dirname}/'dist/index.html`);
  }

  // Closes to task tray if
  win.on('close', (e) => {
    if (closeToTray) { // TODO: Add check in settings to close to task tray.
      e.preventDefault();
      win.hide();
    }
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });


};

try {

  // This prevents multiple instances of the application.
  if (!app.requestSingleInstanceLock()) {
    app.exit();
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    db = await getDatabase('database', 'memory');

    console.log('[DATABASE] Starting database...');
    db.server({
      path: `/db`,
      port: 10102,
      cors: true,
    });
    console.log('[DATABASE] Database started!');

    settingsRef = db.settings;
    await settingsRef.find().exec()
    .then(results => {
      if (results.length === 0) {
        console.log('[DATABASE] Initializing Settings...');
        db.settings.insert(
          {
            id: 'closeToTray',
            name: 'Close to Tray',
            description: 'When app is closed it will still be running in the tray.',
            value: true,
          }
        ).then();
      }
      return;
    });

    settingsRef.find().$.subscribe(results => {
      console.log(`[DATABASE] Results:`, results);

      settings = results;
    });


    setTimeout(() => {
      createApp();
    }, 300);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createApp();
    }
  });

} catch (err) {
  // Catch Error
  // throw err;
  console.error(err);
}
