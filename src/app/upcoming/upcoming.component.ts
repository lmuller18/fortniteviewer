import { Component, OnInit } from '@angular/core';
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
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
  animations: [
    trigger('upcomingState', [
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
export class UpcomingComponent implements OnInit {
  upcoming: any[];
  loading = true;

  filter = false;
  typeFilter = '';
  nameFilter = '';
  rarityFilter = '';
  itemTypes = [
    {
      key: '',
      value: 'Any'
    },
    {
      key: 'backpack',
      value: 'Back Bling'
    },
    {
      key: 'emote',
      value: 'Emote'
    },
    {
      key: 'glider',
      value: 'Glider'
    },
    {
      key: 'emoji',
      value: 'Emoji'
    },
    {
      key: 'loading',
      value: 'Loading Screen'
    },
    {
      key: 'outfit',
      value: 'Skin'
    },
    {
      key: 'pickaxe',
      value: 'Harvesting Tool'
    },
    {
      key: 'skydive',
      value: 'Skydiving Trail'
    },
    {
      key: 'umbrella',
      value: 'Umbrella'
    },
    {
      key: 'spray',
      value: 'Spray'
    },
    {
      key: 'toy',
      value: 'Toy'
    }
  ];
  itemRarities = [
    {
      key: '',
      value: 'Any'
    },
    {
      key: 'common',
      value: 'Common'
    },
    {
      key: 'uncommon',
      value: 'Uncommon'
    },
    {
      key: 'rare',
      value: 'Rare'
    },
    {
      key: 'epic',
      value: 'Epic'
    },
    {
      key: 'legendary',
      value: 'Legendary'
    }
  ];

  constructor(private http: HttpClient, private router: Router) {
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
