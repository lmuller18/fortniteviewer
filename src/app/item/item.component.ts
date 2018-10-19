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
    const topic = this.item.name + this.item.type;
    const sub = {
      item: this.item.name,
      type: this.item.type,
      topic
    };
    this.fcm.getIsSubscribed(sub).subscribe(subbed => {
      this.notify = subbed;
    });
  }

  changeState() {
    if (this.notify) {
      this.fcm.unsub(this.item.name, this.item.type);
      this.notify = false;
    } else {
      this.fcm.sub(this.item.name, this.item.type);
      this.notify = true;
    }
  }
}
