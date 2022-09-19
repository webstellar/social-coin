importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAtji_Qvv2NKawJNT2ClqnAd2ZUSRLhlmA",
  authDomain: "gratitude-385c2.firebaseapp.com",
  projectId: "gratitude-385c2",
  storageBucket: "gratitude-385c2.appspot.com",
  messagingSenderId: "792259688334",
  appId: "1:792259688334:web:9d7b7ebdd9dad2594e96df",
  measurementId: "G-W5Y7GGM8P1"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});