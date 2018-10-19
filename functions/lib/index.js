"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const rq = require("request");
admin.initializeApp();
exports.subscribeToTopic = functions.https.onCall((data, context) => __awaiter(this, void 0, void 0, function* () {
    const topic = data.topic.toLowerCase().replace(/[^a-z0-9]/gi, '');
    yield admin.messaging().subscribeToTopic(data.token, topic);
    yield admin
        .firestore()
        .collection('tokens')
        .doc(data.token)
        .get()
        .then((doc) => __awaiter(this, void 0, void 0, function* () {
        if (!doc.exists) {
            return yield admin
                .firestore()
                .collection('tokens')
                .doc(data.token)
                .create({ subscriptions: [data.details] });
        }
        else {
            const current = doc.data().subscriptions;
            if (itemIndex(current, data.details) > -1) {
                console.log('Subscription already exists');
                return null;
            }
            return yield admin
                .firestore()
                .collection('tokens')
                .doc(data.token)
                .update({ subscriptions: [...current, data.details] });
        }
    }))
        .catch(error => {
        console.log(error);
        return;
    });
    return `subscribed to ${data.topic}`;
}));
exports.unsubscribeFromTopic = functions.https.onCall((data, context) => __awaiter(this, void 0, void 0, function* () {
    const topic = data.topic.toLowerCase().replace(/[^a-z0-9]/gi, '');
    yield admin.messaging().unsubscribeFromTopic(data.token, topic);
    yield admin
        .firestore()
        .collection('tokens')
        .doc(data.token)
        .get()
        .then((doc) => __awaiter(this, void 0, void 0, function* () {
        if (!doc.exists) {
            console.log('No such document!');
            return null;
        }
        else {
            const current = doc.data().subscriptions;
            const index = itemIndex(current, data.details);
            if (index > -1) {
                current.splice(index, 1);
            }
            return yield admin
                .firestore()
                .collection('tokens')
                .doc(data.token)
                .update({ subscriptions: current });
        }
    }))
        .catch(error => {
        console.log(error);
        return;
    });
    return `unsubscribed to ${data.topic}`;
}));
function itemIndex(subs, item) {
    let location = -1;
    subs.forEach((sub, index) => {
        if (sub.item === item.item && sub.type === item.type) {
            location = index;
        }
    });
    return location;
}
exports.notifyStore = functions.firestore
    .document('store/{date}')
    .onCreate((snapshot) => __awaiter(this, void 0, void 0, function* () {
    const store = snapshot.data();
    store.items.forEach(item => {
        const notification = {
            title: `${item.name} is now available in the Fortnite store`,
            body: `${item.name}: ${item.price} ${item.priceIcon}`
        };
        const icon = item.priceItemLink
            ? item.priceItemLink
            : 'https://image.fnbr.co/price/icon_vbucks.png';
        const payload = {
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
}));
exports.notifyUpcoming = functions.firestore
    .document('upcoming/{date}')
    .onUpdate((snapshot) => __awaiter(this, void 0, void 0, function* () {
    const notification = {
        title: `New Upcoming Skins!`,
        body: `Check out the upcoming tab to see the newest skins.`
    };
    const icon = 'https://image.fnbr.co/price/icon_vbucks.png';
    const payload = {
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
}));
exports.getNewUpcoming = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const options = {
        url: 'https://fortniteapi-c5d8e.firebaseapp.com/upcoming'
    };
    yield rq.get(options, (err, response, body) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return;
        }
        const fetched = JSON.parse(body);
        const upcoming = fetched.data;
        const current = yield admin
            .firestore()
            .collection('upcoming')
            .doc('current')
            .get()
            .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                throw new Error('No Current');
            }
            else {
                return doc.data();
            }
        })
            .catch(error => {
            console.log(error);
            return null;
        });
        if (!current || current !== upcoming) {
            yield admin
                .firestore()
                .collection('upcoming')
                .doc('current')
                .set({ items: upcoming })
                .then(function () {
                console.log('Document successfully written!');
            })
                .catch(function (error) {
                console.error('Error writing document: ', error);
            });
        }
        res.send(upcoming);
        return;
    }));
}));
exports.getDailyStore = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const options = {
        url: 'https://fortniteapi-c5d8e.firebaseapp.com/store'
    };
    yield rq.get(options, (err, response, body) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return;
        }
        let store = [];
        const fetched = JSON.parse(body);
        fetched.data.featured.forEach(item => {
            store = [
                ...store,
                Object.assign({}, item, { storeType: 'featured' })
            ];
        });
        fetched.data.daily.forEach(item => {
            store = [
                ...store,
                Object.assign({}, item, { storeType: 'daily' })
            ];
        });
        yield admin
            .firestore()
            .collection('store')
            .doc(new Date().toISOString().slice(0, 10))
            .set({ items: store })
            .then(function () {
            console.log('Document successfully written!');
        })
            .catch(function (error) {
            console.error('Error writing document: ', error);
        });
        res.send(store);
        return;
    }));
}));
//# sourceMappingURL=index.js.map