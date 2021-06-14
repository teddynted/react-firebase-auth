import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCrhaSNNUptuyMKuEOry8m7IgNX_Tki3dc",
    authDomain: "react-auth-7b571.firebaseapp.com",
    projectId: "react-auth-7b571",
    storageBucket: "react-auth-7b571.appspot.com",
    messagingSenderId: "545120856149",
    appId: "1:545120856149:web:c341bea88049eb7fd70cdc",
    measurementId: "G-1Q2C8B7X4Y"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();