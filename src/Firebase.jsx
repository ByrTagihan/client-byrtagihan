// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEJHLRqh7sfQHVtEpmvSJ0mVXGZeCSiM8",
  authDomain: "byrtagihan-63477.firebaseapp.com",
  projectId: "byrtagihan-63477",
  storageBucket: "byrtagihan-63477.appspot.com",
  messagingSenderId: "863632636589",
  appId: "1:863632636589:web:ff06adc862e3269b886424",
  measurementId: "G-LWFZ04F41D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export { analytics };