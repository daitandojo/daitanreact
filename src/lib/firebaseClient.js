import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

let firebaseApp = null;
let authInstance = null;
let firestoreInstance = null;
let storageInstance = null;

/**
 * Initializes Firebase for the client-side app.
 * @returns {object} The Firebase app, auth, firestore, and storage instances.
 */
export function initializeFirebase(config = null) {
  if (!firebaseApp) {
    const firebaseConfig = config || {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    firebaseApp = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized on the client-side');
  }

  if (!authInstance) {
    authInstance = getAuth(firebaseApp);
    console.log('✅ Firebase Auth instance created');
  }

  if (!firestoreInstance) {
    firestoreInstance = getFirestore(firebaseApp);
    console.log('✅ Firestore instance created');
  }

  if (!storageInstance) {
    storageInstance = getStorage(firebaseApp);
    console.log('✅ Storage instance created');
  }

  return {
    app: firebaseApp,
    auth: authInstance,
    firestore: firestoreInstance,
    storage: storageInstance,
  };
}

// Export `authInstance` explicitly
export { authInstance as auth, signOut };

/**
 * Firebase Authentication Methods
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(authInstance);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

export const observeAuthState = (callback) =>
  onAuthStateChanged(authInstance, callback);

/**
 * Firestore Methods
 */
export const addDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(firestoreInstance, collectionName, documentId);
    await setDoc(docRef, data);
    console.log(`Document added to ${collectionName}/${documentId}`);
    return true;
  } catch (error) {
    console.error('Error adding document:', error.message);
    throw error;
  }
};

export const getDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(firestoreInstance, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`Document fetched: ${collectionName}/${documentId}`);
      return docSnap.data();
    }
    console.warn(`No document found at ${collectionName}/${documentId}`);
    return null;
  } catch (error) {
    console.error('Error fetching document:', error.message);
    throw error;
  }
};

export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(firestoreInstance, collectionName, documentId);
    await updateDoc(docRef, data);
    console.log(`Document updated at ${collectionName}/${documentId}`);
    return true;
  } catch (error) {
    console.error('Error updating document:', error.message);
    throw error;
  }
};

export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(firestoreInstance, collectionName, documentId);
    await deleteDoc(docRef);
    console.log(`Document deleted from ${collectionName}/${documentId}`);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error.message);
    throw error;
  }
};

/**
 * Firebase Storage Methods
 */
export const uploadFile = async (path, file) => {
  try {
    const fileRef = ref(storageInstance, path);
    await uploadBytes(fileRef, file);
    console.log(`File uploaded to ${path}`);
    return getDownloadURL(fileRef);
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
};

export const getFileURL = async (path) => {
  try {
    const fileRef = ref(storageInstance, path);
    const url = await getDownloadURL(fileRef);
    console.log(`File URL fetched: ${url}`);
    return url;
  } catch (error) {
    console.error('Error fetching file URL:', error.message);
    throw error;
  }
};

export const deleteFile = async (path) => {
  try {
    const fileRef = ref(storageInstance, path);
    await deleteObject(fileRef);
    console.log(`File deleted from ${path}`);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error.message);
    throw error;
  }
};
