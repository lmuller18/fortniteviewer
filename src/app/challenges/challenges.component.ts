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
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
  animations: [
    trigger('challengesState', [
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
