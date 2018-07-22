import { Component, OnInit } from '@angular/core';
import * as news from '../../mock/news.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  response: any;
  news: any[];
  loading = true;

  constructor(private http: HttpClient) {}

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
