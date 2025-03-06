importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAq72Ws3FmOuDqc7GX82TkFcRDxfcB93NQ",
  authDomain: "upskilling-51b2e.firebaseapp.com",
  projectId: "upskilling-51b2e",
  storageBucket: "upskilling-51b2e.appspot.com",
  messagingSenderId: "543899053740",
  appId: "1:543899053740:web:0cbad844b21fb25536b909",
  measurementId: "G-NEJJ3MN5QK"
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
// });
