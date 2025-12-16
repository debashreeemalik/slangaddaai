// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  increment,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Firebase Services
const firebaseService = {
  // Authentication
  auth,
  googleProvider,
  
  // User Management
  async registerUser(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        isPro: false,
        joinDate: new Date().toISOString(),
        searchHistory: [],
        favorites: [],
        quizScores: []
      });
      
      return { success: true, user: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          isPro: false,
          joinDate: new Date().toISOString(),
          searchHistory: [],
          favorites: [],
          quizScores: [],
          photoURL: user.photoURL
        });
      }
      
      return { success: true, user: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async logoutUser() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  },
  
  // Firestore Operations
  
  // Slang Terms
  async getSlangTerms(filters = {}) {
    try {
      let q = collection(db, "slang");
      
      // Apply filters
      const constraints = [];
      if (filters.category) {
        constraints.push(where("category", "==", filters.category));
      }
      if (filters.safety) {
        constraints.push(where("safety", "==", filters.safety));
      }
      if (filters.search) {
        // Note: Firestore doesn't support full-text search natively
        // For production, consider Algolia or similar
      }
      
      // Add ordering
      constraints.push(orderBy("popularity", "desc"));
      constraints.push(limit(filters.limit || 50));
      
      q = query(q, ...constraints);
      const querySnapshot = await getDocs(q);
      
      const slangTerms = [];
      querySnapshot.forEach((doc) => {
        slangTerms.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: slangTerms };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async getSlangTerm(id) {
    try {
      const docRef = doc(db, "slang", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: "Slang term not found" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async upvoteSlang(slangId, userId) {
    try {
      const slangRef = doc(db, "slang", slangId);
      await updateDoc(slangRef, {
        upvotes: arrayUnion(userId),
        popularity: increment(5)
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async addToSearchHistory(userId, slangId) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        searchHistory: arrayUnion(slangId)
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async toggleFavorite(userId, slangId) {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const isFavorite = userData.favorites?.includes(slangId);
        
        if (isFavorite) {
          await updateDoc(userRef, {
            favorites: arrayRemove(slangId)
          });
          return { success: true, action: "removed" };
        } else {
          await updateDoc(userRef, {
            favorites: arrayUnion(slangId)
          });
          return { success: true, action: "added" };
        }
      }
      
      return { success: false, error: "User not found" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // User Profile
  async getUserProfile(userId) {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, error: "User not found" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Quizzes
  async getQuizzes(level = "beginner") {
    try {
      const q = query(
        collection(db, "quizzes"),
        where("level", "==", level),
        limit(10)
      );
      
      const querySnapshot = await getDocs(q);
      const quizzes = [];
      querySnapshot.forEach((doc) => {
        quizzes.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: quizzes };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  async submitQuizResult(userId, quizId, score) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        quizScores: arrayUnion({
          quizId,
          score,
          date: new Date().toISOString()
        })
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default firebaseService;
