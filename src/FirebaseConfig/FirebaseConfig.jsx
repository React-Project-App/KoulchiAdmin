import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCGuXwRHAoH9hVCBZuYQllezJP8bwECmHU",
    authDomain: "ecommerceapp-b46e6.firebaseapp.com",
    databaseURL: "https://ecommerceapp-b46e6-default-rtdb.firebaseio.com",
    projectId: "ecommerceapp-b46e6",
    storageBucket: "ecommerceapp-b46e6.appspot.com",
    messagingSenderId: "618547235401",
    appId: "1:618547235401:web:e07c47faec5c2a659d4d98",
    measurementId: "G-T1CG676LW5"
  }
  
export  const App=initializeApp(firebaseConfig);
export const db=getFirestore(App);
export const auth=getAuth(App);

export const  storage =getStorage()