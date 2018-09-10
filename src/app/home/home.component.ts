import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('homeState', [
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
export class HomeComponent implements OnInit {
  loading = true;
  links = [
    {
      name: 'Store',
      link: '/store',
      description: 'Daily Cosmetic Store',
      image: '../../assets/img/links/f1.jpg'
    },
    {
      name: 'News',
      link: '/news',
      description: 'Fortnite Battle Royale News',
      image: '../../assets/img/links/f2.jpg'
    },
    {
      name: 'Upcoming',
      link: '/upcoming',
      description: 'Upcoming Cosmetics',
      image: '../../assets/img/links/f3.jpg'
    },
    {
      name: 'Challenges',
      link: '/challenges',
      description: 'Weekly Season Challenges',
      image: '../../assets/img/links/f4.jpg'
    }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  navigate(link) {
    console.log(link);
    this.router.navigateByUrl(link);
  }
}
