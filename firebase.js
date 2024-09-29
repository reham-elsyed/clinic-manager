// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCTOodmMeV8DeISk8B8SerJSB8eFw7gTWA",
  authDomain: "authproject-fbe08.firebaseapp.com",
  projectId: "authproject-fbe08",
  storageBucket: "authproject-fbe08.appspot.com",
  messagingSenderId: "230079242801",
  appId: "1:230079242801:web:36f6602301aa1460ec6b10",
  measurementId: "G-TFRQ5JVQ4W"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const imagestorage = getStorage(firebase);