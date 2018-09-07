import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as twitchStream from '../../mock/twitch-stream.json';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import 'twitch-embed';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements OnInit {
  stream: any;
  streams: any[];
  player: any;
  showStream = true;
  showStreams = false;

  @ViewChild('twitch')
  twitchContainer: ElementRef;

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
    this.loadPlayer();
  }
  onElementReady($element) {
    return new Promise(resolve => {
      const waitForElement = () => {
        if (
          this.elementRef.nativeElement.ownerDocument.getElementById($element)
        ) {
          resolve($element);
        } else {
          window.requestAnimationFrame(waitForElement);
        }
      };
      waitForElement();
    });
  }
  ngOnInit() {}

  loadPlayer() {
    // this.http.get(`https://api.twitch.tv/kraken/streams/?game=Fortnite`, {
    //   headers: { 'Client-ID': '69fkr6blp5udnsrmxytx2mjtzvwgk4' }
    // });
    of(twitchStream).subscribe(
      (streams: any) => {
        this.stream = streams.streams[0];
        this.streams = streams.streams.slice(1, 5);
        console.log((<any>window).Twitch);
        if (typeof window !== 'undefined' && (<any>window).Twitch) {
          this.createPlayer();
        }
      },
      err => console.log(err),
      () => console.log('done loading twitch')
    );
  }

  createPlayer() {
    this.showStream = true;
    this.onElementReady('twitch-embed').then(() => {
      const options = {
        channel: this.stream.channel.name,
        width: '100%',
        height: '100%',
        theme: 'dark',
        autoplay: true
      };
      this.player = new (<any>window).Twitch.Player('twitch-embed', options);
    });
  }

  changeStream(stream) {
    this.showStream = false;
    const index = this.streams.indexOf(stream);
    this.streams[index] = this.stream;
    const iFrame = document.querySelector('iframe');
    iFrame.parentNode.removeChild(iFrame);
    this.stream = stream;
    this.createPlayer();
  }
}
