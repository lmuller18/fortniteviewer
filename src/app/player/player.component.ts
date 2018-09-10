import { Component, OnInit } from '@angular/core';
import * as player from '../../mock/player.json';
import { HttpClient } from '@angular/common/http';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { transitionAnimation } from '../transition.animation';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [transitionAnimation]
})
export class PlayerComponent implements OnInit {
  player: {
    solo: any;
    duo: any;
    squad: any;
    username: string;
    wallpaper: string;
  } = {
    solo: {},
    duo: {},
    squad: {},
    username: '',
    wallpaper: ''
  };
  loading = true;
  error = false;

  groups = ['solo', 'duo', 'squad'];

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
        switchMap((params: ParamMap) =>
          this.getPlayer(params.get('platform'), params.get('username'))
        )
      )
      // of(player)
      .subscribe(
        (data: any) => {
          this.groups.forEach((element, index) => {
            const keys = [];
            for (const key of Object.keys((<any>data).group[element])) {
              keys.push({ key: key, value: (<any>data).group[element][key] });
            }
            this.player[element] = keys;
            this.player[element].wallpaper = this.getWallpaper(index);
          });
          this.player.username = (<any>data).info.username;
          this.loading = false;
        },
        err => {
          this.error =
            err.error && err.error.text ? err.error.text : JSON.stringify(err);
          this.loading = false;
        },
        () => console.log('done loading player')
      );
  }

  getPlayer(platform, username) {
    const url = `https://fortniteapi-c5d8e.firebaseapp.com/player?platform=${platform}&username=${username}&season=weekly`;
    return this.http.get(url);
  }

  getWallpaper(i) {
    return `../../assets/img/wallpaper${i + 1}.jpg`;
  }
}
