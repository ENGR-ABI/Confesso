import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where, orderBy, Timestamp, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "000000000000", // This is needed but the actual value doesn't matter for our use case
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // App will use fallback data instead of Firebase
}

// Sign in anonymously
export const signInAnonymousUser = async () => {
  try {
    if (!auth) {
      console.warn("Auth not initialized, returning mock user");
      return { uid: "mock-user-id" } as User;
    }
    
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    // Return a mock user in case of errors
    return { uid: "mock-user-id" } as User;
  }
};

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (!auth) {
      console.warn("Auth not initialized, returning mock user");
      resolve({ uid: "mock-user-id" } as User);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Ensure user is signed in
export const ensureUserSignedIn = async (): Promise<User> => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      return currentUser;
    }
    
    const newUser = await signInAnonymousUser();
    return newUser;
  } catch (error) {
    console.error("Error ensuring user is signed in:", error);
    // Return a mock user in case of errors
    return { uid: "mock-user-id" } as User;
  }
};

// Mock data store for when Firebase is not available
const mockQuestions: Record<string, any> = {};
const mockReplies: Record<string, any[]> = {};
let mockIdCounter = 1;

// Create a new question thread
export const createQuestion = async (question: string, username: string, avatarUrl?: string | null) => {
  const user = await ensureUserSignedIn();
  
  try {
    if (!db) {
      console.warn("Firestore not initialized, using mock data");
      const timestamp = new Date();
      const mockId = `mock-question-${mockIdCounter++}`;
      
      const questionData = {
        id: mockId,
        text: question,
        username,
        avatarUrl: avatarUrl || null,
        userId: user.uid,
        createdAt: timestamp,
        repliesCount: 0
      };
      
      mockQuestions[mockId] = questionData;
      mockReplies[mockId] = [];
      
      return questionData;
    }
    
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
    
    // Fallback to mock data
    const timestamp = new Date();
    const mockId = `mock-question-${mockIdCounter++}`;
    
    const questionData = {
      id: mockId,
      text: question,
      username,
      avatarUrl: avatarUrl || null,
      userId: user.uid,
      createdAt: timestamp,
      repliesCount: 0
    };
    
    mockQuestions[mockId] = questionData;
    mockReplies[mockId] = [];
    
    return questionData;
  }
};

// Get a question by ID
export const getQuestion = async (questionId: string) => {
  try {
    if (!db) {
      console.warn("Firestore not initialized, using mock data");
      return mockQuestions[questionId] || null;
    }
    
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
    return mockQuestions[questionId] || {
      id: questionId,
      text: "Example question (Firebase unavailable)",
      username: "Anonymous",
      avatarUrl: null,
      userId: "mock-user-id",
      createdAt: new Date(),
      repliesCount: 0
    };
  }
};

// Add a reply to a question
export const addReply = async (questionId: string, reply: string, username: string, avatarUrl?: string | null) => {
  const user = await ensureUserSignedIn();
  
  try {
    if (!db) {
      console.warn("Firestore not initialized, using mock data");
      const timestamp = new Date();
      const mockId = `mock-reply-${mockIdCounter++}`;
      
      const replyData = {
        id: mockId,
        questionId,
        text: reply,
        username,
        avatarUrl: avatarUrl || null,
        userId: user.uid,
        createdAt: timestamp
      };
      
      if (!mockReplies[questionId]) {
        mockReplies[questionId] = [];
      }
      
      mockReplies[questionId].push(replyData);
      
      // Update mock question
      if (mockQuestions[questionId]) {
        mockQuestions[questionId].repliesCount = (mockQuestions[questionId].repliesCount || 0) + 1;
      }
      
      return replyData;
    }
    
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
    
    // Fallback to mock data
    const timestamp = new Date();
    const mockId = `mock-reply-${mockIdCounter++}`;
    
    const replyData = {
      id: mockId,
      questionId,
      text: reply,
      username,
      avatarUrl: avatarUrl || null,
      userId: user.uid,
      createdAt: timestamp
    };
    
    if (!mockReplies[questionId]) {
      mockReplies[questionId] = [];
    }
    
    mockReplies[questionId].push(replyData);
    
    return replyData;
  }
};

// Get all replies for a question
export const getReplies = async (questionId: string) => {
  try {
    if (!db) {
      console.warn("Firestore not initialized, using mock data");
      return mockReplies[questionId] || [];
    }
    
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
    return mockReplies[questionId] || [];
  }
};

export { auth, db };