import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, query, orderByChild, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyByx5_0o3MC8aclMLrC1woK-8gRqx36Rhg",
  authDomain: "viajuupong.firebaseapp.com",
  databaseURL: "https://viajuupong-default-rtdb.firebaseio.com",
  projectId: "viajuupong",
  storageBucket: "viajuupong.firebasestorage.app",
  messagingSenderId: "875468007130",
  appId: "1:875468007130:web:b3174fbbfd032f163c27e3",
  measurementId: "G-0WG4QDPJEN"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.firebaseDB = database;
