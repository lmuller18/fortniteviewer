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
  store: any[];
  loading = true;

  typeFilter = '';
  nameFilter = '';
  rarityFilter = '';
  storeFilter = '';

  filter = false;

  storeTypes = [
    {
      key: '',
      value: 'Any'
    },
    {
      key: 'featured',
      value: 'Featured'
    },
    {
      key: 'daily',
      value: 'Daily'
    }
  ];

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
        let store = [];
        this.response.data.featured.forEach(item => {
          store = [
            ...store,
            {
              ...item,
              storeType: 'featured'
            }
          ];
        });
        this.response.data.daily.forEach(item => {
          store = [
            ...store,
            {
              ...item,
              storeType: 'daily'
            }
          ];
        });
        this.store = store;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      },
      () => console.log('done loading store')
    );
  }
}
