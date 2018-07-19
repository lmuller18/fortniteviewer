import { Component } from '@angular/core';
import * as store from '../../mock/store.json';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  store: any[];

  constructor() {
    this.store = (<any>store).items;
  }
}
