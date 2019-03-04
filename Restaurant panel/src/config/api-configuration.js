import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_BuLvhff43WKjl19h0yjPJXmyKM-KWVE",
    authDomain: "oculend.firebaseapp.com",
    databaseURL: "https://oculend.firebaseio.com",
    projectId: "oculend",
    storageBucket: "oculend.appspot.com",
    messagingSenderId: "757598992281"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const storage = firebase.storage();
  export const api_base_url = "http://localhost:9000";
  export const db = firebase.database();