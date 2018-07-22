import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  response: any;
  store: any[];
  vbucks: string;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStore();
  }

  getStore() {
    this.http.get(`https://fortniteapi-c5d8e.firebaseapp.com/store`).subscribe(
      data => {
        this.response = data;
        this.store = this.response.items;
        this.vbucks = this.response.vbucks;
        this.loading = false;
      },
      err => console.log(err),
      () => console.log('done loading store')
    );
  }
}
