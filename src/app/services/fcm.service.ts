import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

import * as app from 'firebase';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
app.initializeApp(environment.firebase);
const _messaging = app.messaging();
_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
_messaging.onMessage = _messaging.onMessage.bind(_messaging);

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
    private snackBar: MatSnackBar
  ) {}

  async makeToast(message) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

  getPermission() {
    this.afMessaging.requestPermission.subscribe(
      () => {
        this.afMessaging.getToken.subscribe(token => {
          this.token = token;
          this.afStore
            .collection('tokens')
            .doc(this.token)
            .get()
            .subscribe(doc => {
              if (doc.exists) {
                this.subscriptions.next(doc.data().subscriptions);
              }
            });
        });
        console.log('Permission granted!');
      },
      error => {
        console.error(error);
      }
    );
  }

  showMessage() {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.body;
        console.log('notification', body);
        this.makeToast(body);
      })
    );
  }

  getSubscriptions() {
    return this.subscriptions.asObservable();
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
