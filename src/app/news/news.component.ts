import { Component, OnInit } from '@angular/core';
import * as news from '../../mock/news.json';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger('newsState', [
      state(
        'true',
        style({
          display: 'none',
          visibility: 'hidden',
          opacity: 0,
          transition: 'visibility 0s, opacity 0.5s linear'
        })
      ),
      state(
        'false',
        style({
          visibility: 'visible',
          opacity: 1
        })
      ),
      transition('true => false', animate('500ms ease-in')),
      transition('false => true', animate('500ms ease-out'))
    ])
  ]
})
export class NewsComponent implements OnInit {
  response: any;
  news: any[];
  loading = true;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.http.get(`https://fortniteapi-c5d8e.firebaseapp.com/news`).subscribe(
      data => {
        this.response = data;
        this.news = this.response.br;
        this.loading = false;
      },
      err => console.log(err),
      () => console.log('done loading news')
    );
  }
}
