import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB8AXb5pmw1_bzq8IJQiPC7MT-nDk1IXzo",
  authDomain: "bank-of-zp.firebaseapp.com",
  databaseURL: "https://bank-of-zp-default-rtdb.firebaseio.com",
  projectId: "bank-of-zp",
  storageBucket: "bank-of-zp.appspot.com",
  messagingSenderId: "377235341578",
  appId: "1:377235341578:web:594e36329dcd84ed547af3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;