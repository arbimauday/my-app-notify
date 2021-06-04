importScripts("https://www.gstatic.com/firebasejs/8.6.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.4/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyBf_MB_gQoX-VrCO8TcIQIbqvGTH5G9_ls",
    authDomain: "gx-customer-notify.firebaseapp.com",
    projectId: "gx-customer-notify",
    storageBucket: "gx-customer-notify.appspot.com",
    messagingSenderId: "677270202358",
    appId: "1:677270202358:web:5c02f0a44b3fc7d54209d7"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    let title = payload.notification.title;
    let options = {
        body: payload.notification.body,
        icon: ''
    };

    return self.registration.showNotification(title, options);
});


self.addEventListener('notificationclick', function(event) {
    console.log(event.notification)
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function(clientList) {
        for (let i = 0; i < clientList.length; i++) {
            let client = clientList[i];
            if (client.url == event.notification.data.url && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow(event.notification.data.url);
    }));

});