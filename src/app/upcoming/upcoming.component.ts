import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { transitionAnimation } from '../transition.animation';
import { FcmService } from '../services/fcm.service';
import { itemTypes, itemRarities } from '../shared/rarities';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
  animations: [transitionAnimation]
})
export class UpcomingComponent implements OnInit {
  upcoming: any[];
  loading = true;

  filter = false;
  typeFilter = '';
  nameFilter = '';
  rarityFilter = '';

  itemTypes = itemTypes;
  itemRarities = itemRarities;

  constructor(
    private http: HttpClient,
    private router: Router,
    public fcm: FcmService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.getUpcoming();
  }

  getUpcoming() {
    this.http
      .get(`https://fortniteapi-c5d8e.firebaseapp.com/upcoming`)
      .subscribe(
        (data: any) => {
          this.upcoming = data.data;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        },
        () => console.log('done loading store')
      );
  }
}
