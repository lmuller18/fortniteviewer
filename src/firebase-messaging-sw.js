importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js');

if (firebase.messaging.isSupported()) {
  firebase.initializeApp({
    messagingSenderId: '13273579402'
  });
  const messaging = firebase.messaging();
}

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  clients.openWindow('https://fortniteviewer.app/store');
});
