import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  response: any;
  store: {
    featured: any[];
    daily: any[];
  };
  loading = true;

  featuredTypeFilter = '';
  featuredNameFilter = '';
  featuredRarityFilter = '';

  dailyTypeFilter = '';
  dailyNameFilter = '';
  dailyRarityFilter = '';

  featuredFilter = false;
  dailyFilter = false;

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
    this.getStore();
  }

  getStore() {
    this.http.get(`https://fortniteapi-c5d8e.firebaseapp.com/store`).subscribe(
      data => {
        this.response = data;
        this.store = this.response.data;
        this.loading = false;
      },
      err => console.log(err),
      () => console.log('done loading store')
    );
  }
}
