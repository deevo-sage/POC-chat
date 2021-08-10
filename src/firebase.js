import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBXnJgoPRtmc11FU5Cf1Wdm55Tvn6cG1tI",
  authDomain: "poc-feed.firebaseapp.com",
  projectId: "poc-feed",
  storageBucket: "poc-feed.appspot.com",
  messagingSenderId: "290993717454",
  appId: "1:290993717454:web:eb6925c32c1d606c87109f",
  measurementId: "G-ZRQE6W9XKH",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
// export const firestore = firebase.firestore();
export const auth = firebase.auth();
