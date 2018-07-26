import { Component, OnInit } from '@angular/core';
import * as player from '../../mock/player.json';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player: {
    solo: any;
    duo: any;
    squad: any;
    username: string;
  } = {
    solo: {},
    duo: {},
    squad: {},
    username: ''
  };
  loading = true;

  groups = ['solo', 'duo', 'squad'];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.getPlayer(params.get('platform'), params.get('username'))
        )
      )
      .subscribe(
        data => {
          this.groups.forEach(element => {
            const keys = [];
            for (const key of Object.keys((<any>data).group[element])) {
              keys.push({ key: key, value: (<any>data).group[element][key] });
            }
            this.player[element] = keys;
          });
          this.player.username = (<any>data).info.username;
          this.loading = false;
        },
        err => console.log(err),
        () => console.log('done loading player')
      );
    // .subscribe(fetchedPlayer => (this.player = fetchedPlayer));
  }

  getPlayer(platform, username) {
    /*
    const fetchedPlayer = {
      solo: {},
      duo: {},
      squad: {}
    };
    this.groups.forEach(element => {
      const keys = [];
      for (const key of Object.keys((<any>player).group[element])) {
        keys.push({ key: key, value: (<any>player).group[element][key] });
      }
      fetchedPlayer[element] = keys;
    });
    return of(fetchedPlayer);
    */

    return this.http.get(
      `https://fortniteapi-c5d8e.firebaseapp.com/player?platform=${platform}&username=${username}&season=weekly`
    );
  }
}
