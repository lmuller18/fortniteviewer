import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as rq from 'request';

admin.initializeApp();

export const subscribeToTopic = functions.https.onCall(
  async (data, context) => {
    const topic = data.topic.toLowerCase().replace(/[^a-z0-9]/gi, '');
    await admin.messaging().subscribeToTopic(data.token, topic);

    await admin
      .firestore()
      .collection('tokens')
      .doc(data.token)
      .get()
      .then(async doc => {
        if (!doc.exists) {
          return await admin
            .firestore()
            .collection('tokens')
            .doc(data.token)
            .create({ subscriptions: [data.details] });
        } else {
          const current = doc.data().subscriptions as Array<any>;
          if (itemIndex(current, data.details) > -1) {
            console.log('Subscription already exists');
            return null;
          }
          return await admin
            .firestore()
            .collection('tokens')
            .doc(data.token)
            .update({ subscriptions: [...current, data.details] });
        }
      })
      .catch(error => {
        console.log(error);
        return;
      });

    return `subscribed to ${data.topic}`;
  }
);

export const unsubscribeFromTopic = functions.https.onCall(
  async (data, context) => {
    const topic = data.topic.toLowerCase().replace(/[^a-z0-9]/gi, '');

    await admin.messaging().unsubscribeFromTopic(data.token, topic);

    await admin
      .firestore()
      .collection('tokens')
      .doc(data.token)
      .get()
      .then(async doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return null;
        } else {
          const current = doc.data().subscriptions as Array<any>;
          const index = itemIndex(current, data.details);
          if (index > -1) {
            current.splice(index, 1);
          }
          return await admin
            .firestore()
            .collection('tokens')
            .doc(data.token)
            .update({ subscriptions: current });
        }
      })
      .catch(error => {
        console.log(error);
        return;
      });

    return `unsubscribed to ${data.topic}`;
  }
);

function itemIndex(subs, item): number {
  let location = -1;
  subs.forEach((sub, index) => {
    if (sub.item === item.item && sub.type === item.type) {
      location = index;
    }
  });
  return location;
}

export const notifyStore = functions.firestore
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

export const notifyUpcoming = functions.firestore
  .document('upcoming/{date}')
  .onUpdate(async snapshot => {
    const notification: admin.messaging.Notification = {
      title: `New Upcoming Skins!`,
      body: `Check out the upcoming tab to see the newest skins.`
    };

    const icon = 'https://image.fnbr.co/price/icon_vbucks.png';

    const payload: admin.messaging.Message = {
      notification,
      webpush: {
        notification: {
          vibrate: [200, 100, 200],
          icon: icon
        }
      },
      topic: `newUpcoming`
    };
    return admin.messaging().send(payload);
  });

export const getNewUpcoming = functions.https.onRequest(async (req, res) => {
  const options = {
    url: 'https://fortniteapi-c5d8e.firebaseapp.com/upcoming'
  };

  await rq.get(options, async (err, response, body) => {
    if (err) {
      console.log(err);
      return;
    }

    const fetched = JSON.parse(body);
    const upcoming = fetched.data;

    const current = await admin
      .firestore()
      .collection('upcoming')
      .doc('current')
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          throw new Error('No Current');
        } else {
          return doc.data();
        }
      })
      .catch(error => {
        console.log(error);
        return null;
      });

    if (!current || current !== upcoming) {
      await admin
        .firestore()
        .collection('upcoming')
        .doc('current')
        .set({ items: upcoming })
        .then(function() {
          console.log('Document successfully written!');
        })
        .catch(function(error) {
          console.error('Error writing document: ', error);
        });
    }
    res.send(upcoming);
    return;
  });
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
