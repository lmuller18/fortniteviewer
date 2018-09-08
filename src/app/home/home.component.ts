import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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

  navigate(link) {
    console.log(link);
    this.router.navigateByUrl(link);
  }
}
