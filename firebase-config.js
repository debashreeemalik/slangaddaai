// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUit5I8Qml9wWIsKATJkwOhOdlCw06irg",
  authDomain: "slangaddaai.firebaseapp.com",
  projectId: "slangaddaai",
  storageBucket: "slangaddaai.firebasestorage.app",
  messagingSenderId: "633159892736",
  appId: "1:633159892736:web:b33c2d89f3cba1f609fde5",
  measurementId: "G-LG4J2DX0H9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
