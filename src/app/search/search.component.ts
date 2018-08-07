import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, NavigationEnd } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  platformFormControl = new FormControl('', [Validators.required]);
  itemFormControl = new FormControl('', [Validators.required]);
  itemTypeFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  platforms = [
    {
      key: 'pc',
      value: 'PC'
    },
    {
      key: 'xb1',
      value: 'Xbox'
    },
    {
      key: 'ps4',
      value: 'PlayStation'
    }
  ];

  itemTypes = [
    {
      key: 'any',
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

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {}

  searchPlayer() {
    if (this.usernameFormControl.value && this.platformFormControl.value) {
      const username = this.usernameFormControl.value;
      const platform = this.platformFormControl.value;
      this.router.navigate([`/player/${platform}/${username}`]);
    }
  }

  searchItem() {
    if (this.itemFormControl.value && this.itemTypeFormControl.value) {
      const item = this.itemFormControl.value;
      const type = this.itemTypeFormControl.value;
      this.router.navigate([`/items/${type}/${item}`]);
    }
  }
}
