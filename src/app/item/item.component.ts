import { Component, OnInit, Input } from '@angular/core';
import { transitionAnimation } from '../transition.animation';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [transitionAnimation]
})
export class ItemComponent implements OnInit {
  @Input()
  item: any;

  constructor() {}

  ngOnInit() {}
}
