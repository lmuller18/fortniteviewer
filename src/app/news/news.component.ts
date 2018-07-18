import { Component } from '@angular/core';
import * as news from '../../mock/news.json';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  news: any[];

  constructor() {
    this.news = (<any>news).entries;
  }
}
