import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    if (this.usernameFormControl.value && this.platformFormControl.value) {
      const username = this.usernameFormControl.value;
      const platform = this.platformFormControl.value;
      this.router.navigate([`/player/${platform}/${username}`]);
    }
  }
}
