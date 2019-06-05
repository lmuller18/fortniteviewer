import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;
  subscriptions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private afMessaging: AngularFireMessaging,
    private afStore: AngularFirestore,
    private fun: AngularFireFunctions,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  async makeToast(message) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

  getPermission() {
    try {
      this.afMessaging.requestPermission.subscribe(
        () => {
          this.afMessaging.getToken.subscribe(token => {
            this.token = token;
            this.createSubscription();
          });
          console.log('Permission granted!');
        },
        error => {
          console.error(error);
        }
      );
    } catch (e) {
      console.log('Unable to request permission', e);
    }
  }

  createSubscription() {
    this.afStore
      .collection('tokens')
      .doc(this.token)
      .valueChanges()
      .subscribe(doc => {
        if (doc) {
          this.subscriptions.next((<any>doc).subscriptions);
        }
      });
  }

  showMessage() {
    try {
      return this.afMessaging.messages.pipe(
        tap(msg => {
          const body: any = (msg as any).notification.body;
          console.log('notification', body);
          this.makeToast(body);
        })
      );
    } catch (e) {
      console.log('Unable to listen for messages');
    }
  }

  getSubscriptions() {
    return this.subscriptions.asObservable();
  }

  getSubscriptionsAsItems() {
    const subsAsItems = new BehaviorSubject<any[]>([]);
    this.getSubscriptions().subscribe(subs => {
      let items = [];
      subs.forEach(async sub => {
        const url = `https://fortniteapi-c5d8e.firebaseapp.com/items?query=${
          sub.item
        }&type=${sub.type}`;
        await this.http.get(url).subscribe(data => {
          items = [...items, (<any>data).data[0]];
          subsAsItems.next(items);
        });
      });
      return;
    });
    return subsAsItems.asObservable();
  }

  getIsSubscribed(topic) {
    const subscribed = new BehaviorSubject<boolean>(false);
    this.subscriptions.subscribe(subs => {
      let found = false;
      subs.forEach(sub => {
        if (sub.item === topic.item && sub.type === topic.type) {
          found = true;
        }
      });
      subscribed.next(found);
    });
    return subscribed.asObservable();
  }

  sub(item: string, type: string) {
    const topic = item + type;
    const details = {
      item,
      type,
      topic
    };
    this.fun
      .httpsCallable('subscribeToTopic')({
        topic: topic,
        token: this.token,
        details
      })
      .pipe(tap(_ => this.makeToast(`Subscribed to ${item}`)))
      .subscribe();
  }

  unsub(item: string, type: string) {
    const topic = item + type;
    const details = {
      item,
      type,
      topic
    };
    this.fun
      .httpsCallable('unsubscribeFromTopic')({
        topic: topic,
        token: this.token,
        details
      })
      .pipe(tap(_ => this.makeToast(`Unsubscribed to ${item}`)))
      .subscribe();
  }
}
