import firebase from 'firebase/app'
import 'firebase/messaging'

const STORAGE_FIREBASE_TOKEN = 'my-token'
export const getFirebaseToken = window.localStorage.getItem(STORAGE_FIREBASE_TOKEN)
export const saveFirebaseToken = (token) => {window.localStorage.setItem(STORAGE_FIREBASE_TOKEN, token)}
export const isFirebaseToken = getFirebaseToken ? true : false
export const removeFirebaseToken = () => {return window.localStorage.removeItem(STORAGE_FIREBASE_TOKEN)}

const firebaseConfig = {
    apiKey: "AIzaSyBf_MB_gQoX-VrCO8TcIQIbqvGTH5G9_ls",
    authDomain: "gx-customer-notify.firebaseapp.com",
    projectId: "gx-customer-notify",
    storageBucket: "gx-customer-notify.appspot.com",
    messagingSenderId: "677270202358",
    appId: "1:677270202358:web:5c02f0a44b3fc7d54209d7"
};
firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();

messaging.requestPermission().then(() => {
    return messaging.getToken()
}).then(token => {
    if (!isFirebaseToken) {
        console.log('lihat token: ', token)
        removeFirebaseToken()
        setTimeout(() => {
            saveFirebaseToken(token)
        }, 100)
    }
}).catch(() => {
    console.log('error');
});


messaging.onMessage(function (payload) {
    console.log('onMessage: ', payload)

    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    const notification = new Notification(title, options);

    console.log('notification: ', notification)
});
