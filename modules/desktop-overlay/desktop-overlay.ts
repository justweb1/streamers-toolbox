import { remote, screen, BrowserWindow, BrowserWindowConstructorOptions, app } from 'electron';

export class DesktopOverlay extends BrowserWindow {
  desktopOverlay: BrowserWindow;

  constrtuctor(title: string, url?: URL) {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;

    this.desktopOverlay = new BrowserWindow({
      title: `Desktop Overlay`,
      maxWidth: screenSize.width,
      maxHeight: screenSize.height,
      frame: false,
      resizable: false,
      transparent: true,
    });

  }

}
