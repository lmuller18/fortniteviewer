import { Component, OnInit } from '@angular/core';
import * as news from '../../mock/news.json';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { transitionAnimation } from '../transition.animation';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [transitionAnimation]
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
