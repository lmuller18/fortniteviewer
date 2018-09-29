import { Component, OnInit, Input } from '@angular/core';
import { transitionAnimation } from '../transition.animation';
import { checkAnimation } from '../check.animation';
import { MatSnackBar } from '@angular/material';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [transitionAnimation, checkAnimation]
})
export class ItemComponent implements OnInit {
  @Input()
  item: any;
  loaded = false;

  notify = false;
  message = 'Notifications are coming soon!';

  constructor(public fcm: FcmService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  changeState() {
    if (this.notify) {
      this.fcm.sub('unsub');
      this.notify = false;
    } else {
      this.fcm.sub('discounts');
      this.notify = true;
      this.snackBar.open(this.message, '', {
        duration: 2000
      });
    }
  }
}
