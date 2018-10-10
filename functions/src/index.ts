import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as rq from 'request';

admin.initializeApp();

export const subscribeToTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().subscribeToTopic(data.token, data.topic);

    return `subscribed to ${data.topic}`;
  }
);

export const unsubscribeFromTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().unsubscribeFromTopic(data.token, data.topic);

    return `unsubscribed to ${data.topic}`;
  }
);

export const sendOnFirestoreCreate = functions.firestore
  .document('store/{date}')
  .onCreate(async snapshot => {
    const store = snapshot.data();

    store.items.forEach(item => {
      const notification: admin.messaging.Notification = {
        title: `${item.name} is now available in the Fortnite store`,
        body: `${item.name}: ${item.price} ${item.priceIcon}`
      };

      const icon = item.priceItemLink
        ? item.priceItemLink
        : 'https://image.fnbr.co/price/icon_vbucks.png';

      const payload: admin.messaging.Message = {
        notification,
        webpush: {
          notification: {
            vibrate: [200, 100, 200],
            icon: icon
          }
        },
        topic: `${item.name.toLowerCase().replace(/[^a-z0-9]/gi, '')}`
      };
      return admin.messaging().send(payload);
    });
    return;
  });

export const getDailyStore = functions.https.onRequest(async (req, res) => {
  const options = {
    url: 'https://fortniteapi-c5d8e.firebaseapp.com/store'
  };

  await rq.get(options, async (err, response, body) => {
    if (err) {
      console.log(err);
      return;
    }

    let store = [];
    const fetched = JSON.parse(body);
    fetched.data.featured.forEach(item => {
      store = [
        ...store,
        {
          ...item,
          storeType: 'featured'
        }
      ];
    });
    fetched.data.daily.forEach(item => {
      store = [
        ...store,
        {
          ...item,
          storeType: 'daily'
        }
      ];
    });

    await admin
      .firestore()
      .collection('store')
      .doc(new Date().toISOString().slice(0, 10))
      .set({ items: store })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });

    res.send(store);
    return;
  });
});
