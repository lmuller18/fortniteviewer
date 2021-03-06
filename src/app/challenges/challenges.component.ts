import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { transitionAnimation } from '../transition.animation';
@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
  animations: [transitionAnimation]
})
export class ChallengesComponent implements OnInit {
  response: any;
  challenges: any[];
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
    this.getChallenges();
  }

  getChallenges() {
    this.http
      .get(`https://fortniteapi-c5d8e.firebaseapp.com/challenges`)
      .subscribe(
        data => {
          this.response = data;
          const keys = [];
          for (const key of Object.keys((<any>data).challenges)) {
            keys.push({ key: key, value: (<any>data).challenges[key] });
          }

          let found = false;
          let index = 9;
          keys.forEach((key, i) => {
            if (key.value.length === 0 && !found) {
              found = true;
              index = i - 1;
            }
          });

          keys[index].current = true;
          this.challenges = keys;
        },
        err => console.log(err),
        () => {
          this.loading = false;
          console.log('done loading challenges');
        }
      );
  }
}
