import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as items from '../../mock/items.json';
import { transitionAnimation } from '../transition.animation';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [transitionAnimation]
})
export class ItemsComponent implements OnInit {
  response: any;
  items: any[];
  query: any;
  loading = true;
  error = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.query = params.get('item');
          return this.getItems(params.get('type'), params.get('item'));
        })
      )
      // of(items)
      .subscribe(
        (data: any) => {
          this.items = (<any>data).data;
          this.loading = false;
        },
        err => {
          this.loading = false;
        },
        () => console.log('done loading items')
      );
  }

  getItems(type, item) {
    const url = `https://fortniteapi-c5d8e.firebaseapp.com/items?query=${item}&type=${type}`;
    return this.http.get(url);
  }
}
