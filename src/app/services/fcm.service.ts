import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

import * as app from 'firebase';
const _messaging = app.messaging();
_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
_messaging.onMessage = _messaging.onMessage.bind(_messaging);

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private snackBar: MatSnackBar
  ) {}

  async makeToast(message) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

  getPermission() {
    return this.afMessaging.requestToken.pipe(
      tap(token => (this.token = token))
    );
  }

  showMessage() {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.body;
        this.makeToast(body);
      })
    );
  }

  sub(topic) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`Subscribed to ${topic}`)))
      .subscribe();
  }

  unsub(topic) {
    this.fun
      .httpsCallable('unsubscribeToTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`Unsubscribed to ${topic}`)))
      .subscribe();
  }
}
