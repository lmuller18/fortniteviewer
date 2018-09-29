import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { MatSidenav, MatIconRegistry } from '@angular/material';
import { FcmService } from './services/fcm.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  title = 'app';

  constructor(
    elementRef: ElementRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public fcm: FcmService
  ) {
    const hammertime = new Hammer(elementRef.nativeElement, {});
    hammertime.on('panright', ev => {
      const origin = ev.changedPointers[0].screenX - ev.deltaX;
      if (origin <= 15) {
        this.sidenav.open();
      }
    });
    hammertime.on('panleft', ev => {
      this.sidenav.close();
    });

    this.matIconRegistry.addSvgIcon(
      `trophy`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/trophy.svg'
      )
    );
    fcm.getPermission();
    fcm.showMessage().subscribe();
  }
}
