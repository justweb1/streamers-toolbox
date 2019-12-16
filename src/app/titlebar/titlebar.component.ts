import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronService } from 'ngx-electron';
import { BrowserWindow } from 'electron';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {
  win: BrowserWindow = this.electron.remote.getCurrentWindow();
  isMaximized: Boolean;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private electron: ElectronService) {

    iconRegistry.addSvgIconSetInNamespace('app', sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons.svg'));

    this.win.on('maximize', () => {
      this.isMaximized = true;
    });

    this.win.on('unmaximize', () => {
      this.isMaximized = false;
    });

  }

  maximize = () => {
    this.isMaximized = true;
    this.win.maximize();
  }

  unmaximize = () => {
    this.isMaximized = false;
    this.win.unmaximize();
  }

  ngOnInit() {
    this.isMaximized = this.win.isMaximized();
  }
}
