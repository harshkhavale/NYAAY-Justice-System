import 'firebase/storage'; // Import Firebase Storage
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC2IRl0sFjyE9LXhbWA-_LJqincREoVH9k",
    authDomain: "nyaay-justice-system.firebaseapp.com",
    databaseURL: "https://nyaay-justice-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nyaay-justice-system",
    storageBucket: "nyaay-justice-system.appspot.com",
    messagingSenderId: "851454786365",
    appId: "1:851454786365:web:31de504b7d1b8f07c6a354",
    measurementId: "G-N0D6K2D22C"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);