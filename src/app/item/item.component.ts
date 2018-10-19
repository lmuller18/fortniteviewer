import { Component, OnInit, Input } from '@angular/core';
import { transitionAnimation } from '../transition.animation';
import { checkAnimation } from '../check.animation';
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

  constructor(public fcm: FcmService) {}

  ngOnInit() {
    this.fcm.subscriptions.subscribe(subs => {
      this.notify = subs.includes(
        this.item.name.toLowerCase().replace(/[^a-z0-9]/gi, '')
      );
    });
  }

  changeState() {
    if (this.notify) {
      this.fcm.unsub(this.item.name);
      this.notify = false;
    } else {
      this.fcm.sub(this.item.name);
      this.notify = true;
    }
  }
}
