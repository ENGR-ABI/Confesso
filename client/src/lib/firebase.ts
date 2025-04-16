import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where, orderBy, Timestamp, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign in anonymously
export const signInAnonymousUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Ensure user is signed in
export const ensureUserSignedIn = async (): Promise<User> => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return currentUser;
  }
  
  const newUser = await signInAnonymousUser();
  return newUser;
};

// Create a new question thread
export const createQuestion = async (question: string, username: string, avatarUrl?: string | null) => {
  const user = await ensureUserSignedIn();
  
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      text: question,
      username,
      avatarUrl: avatarUrl || null,
      userId: user.uid,
      createdAt: Timestamp.now(),
      repliesCount: 0
    });
    
    return {
      id: docRef.id,
      text: question,
      username,
      avatarUrl: avatarUrl || null,
      userId: user.uid,
      createdAt: Timestamp.now(),
      repliesCount: 0
    };
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// Get a question by ID
export const getQuestion = async (questionId: string) => {
  try {
    const docRef = doc(db, "questions", questionId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting question:", error);
    throw error;
  }
};

// Add a reply to a question
export const addReply = async (questionId: string, reply: string, username: string, avatarUrl?: string | null) => {
  const user = await ensureUserSignedIn();
  
  try {
    // Add the reply
    const replyRef = await addDoc(collection(db, "replies"), {
      questionId,
      text: reply,
      username,
      avatarUrl: avatarUrl || null,
      userId: user.uid,
      createdAt: Timestamp.now()
    });
    
    // Update the question's reply count
    const questionRef = doc(db, "questions", questionId);
    const questionDoc = await getDoc(questionRef);
    
    if (questionDoc.exists()) {
      const currentReplies = questionDoc.data().repliesCount || 0;
      await updateDoc(questionRef, {
        repliesCount: currentReplies + 1
      });
    }
    
    return {
      id: replyRef.id,
      questionId,
      text: reply,
      username,
      avatarUrl: avatarUrl || null,
      userId: user.uid,
      createdAt: Timestamp.now()
    };
  } catch (error) {
    console.error("Error adding reply:", error);
    throw error;
  }
};

// Get all replies for a question
export const getReplies = async (questionId: string) => {
  try {
    const q = query(
      collection(db, "replies"),
      where("questionId", "==", questionId),
      orderBy("createdAt", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    const replies: any[] = [];
    
    querySnapshot.forEach((doc) => {
      replies.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return replies;
  } catch (error) {
    console.error("Error getting replies:", error);
    throw error;
  }
};

export { auth, db };