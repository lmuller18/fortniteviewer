import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as twitchGame from '../../mock/twitch-game.json';
import * as twitchStream from '../../mock/twitch-stream.json';
import * as twitchUser from '../../mock/twitch-user.json';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import 'twitch-embed';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements OnInit {
  game: any;
  stream: any;
  user: any;
  loading = true;

  links: [
    {
      name: 'Store';
      description: 'Daily Cosmetic Store';
    },
    {
      name: 'News';
      description: 'Fortnite Battle Royale News';
    },
    {
      name: 'Upcoming';
      description: 'Upcoming Cosmetics';
    },
    {
      name: 'Challeneges';
      description: 'Weekly Season Challenges';
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
    this.http
      .get(`https://api.twitch.tv/helix/games?name=Fortnite`, {
        headers: { 'Client-ID': '69fkr6blp5udnsrmxytx2mjtzvwgk4' }
      })
      // of(twitchGame)
      .subscribe(
        search => {
          this.game = (<any>search).data[0];
          this.loading = false;
          this.http
            .get(
              `https://api.twitch.tv/helix/streams?game_id=${this.game.id}`,
              {
                headers: { 'Client-ID': '69fkr6blp5udnsrmxytx2mjtzvwgk4' }
              }
            )
            // of(twitchStream)
            .subscribe(streams => {
              this.stream = (<any>streams).data[0];
              console.log('stream', this.stream);
              this.http
                .get(
                  `https://api.twitch.tv/helix/users?id=${this.stream.user_id}`,
                  {
                    headers: { 'Client-ID': '69fkr6blp5udnsrmxytx2mjtzvwgk4' }
                  }
                )
                // of(twitchUser)
                .subscribe(user => {
                  this.user = (<any>user).data[0];
                  if (typeof window !== 'undefined' && (<any>window).Twitch) {
                    const x = new (<any>window).Twitch.Player('twitch-embed', {
                      channel: this.user.login,
                      width: window.innerWidth,
                      height: (9 * window.innerWidth) / 16
                    });
                  }
                  console.log('user', this.user);
                });
            });
          console.log('twitch', this.game);
        },
        err => console.log(err),
        () => console.log('done loading twitch')
      );
  }
}
