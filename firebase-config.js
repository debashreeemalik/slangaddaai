const firebaseConfig = {
  apiKey: "AIzaSyAUit5I8Qml9wWIsKATJkwOhOdlCw06irg",
  authDomain: "slangaddaai.firebaseapp.com",
  projectId: "slangaddaai",
  storageBucket: "slangaddaai.firebasestorage.app",
  messagingSenderId: "633159892736",
  appId: "1:633159892736:web:b33c2d89f3cba1f609fde5",
  measurementId: "G-LG4J2DX0H9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Export for use
window.firebaseApp = app;
window.firestoreDB = db;
window.firebaseAuth = auth;
window.firebaseStorage = storage;
