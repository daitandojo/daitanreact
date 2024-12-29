import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@/lib/firebase/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);

  // Fetches Firebase token for authenticated requests
  const getToken = async () => {
    if (auth.currentUser) {
      console.log('[AuthContext] Getting ID token...');
      return await auth.currentUser.getIdToken();
    }
    console.warn('[AuthContext] No current user found for getToken.');
    return null;
  };

  // Fetch user profile from MongoDB using Firebase UID
  const fetchMongoUserProfile = async (firebaseUser) => {
    if (!firebaseUser) {
      console.warn('[AuthContext] No Firebase user provided to fetchMongoUserProfile.');
      return null;
    }
    try {
      const token = await getToken();
      if (!token) {
        console.warn('[AuthContext] Unable to retrieve Firebase token.');
        return null;
      }

      console.log('[AuthContext] Fetching user profile from MongoDB for UID:', firebaseUser.uid);
      const response = await fetch(`/api/users/${firebaseUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('[AuthContext] MongoDB user profile fetched:', userData);
        return userData;
      } else if (response.status === 404) {
        console.log('[AuthContext] User not found in MongoDB. Creating new profile...');
        const newUserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.email,
          displayName: firebaseUser.displayName,
          firstname: firebaseUser.displayName,
          profilepicture: firebaseUser.photoURL,
        };

        const createResponse = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUserProfile),
        });

        if (createResponse.ok) {
          const createdUser = await createResponse.json();
          console.log('[AuthContext] New MongoDB user profile created:', createdUser);
          return createdUser;
        } else {
          throw new Error('Failed to create MongoDB user profile');
        }
      } else {
        throw new Error('Failed to fetch MongoDB user profile');
      }
    } catch (error) {
      console.error('[AuthContext] Error in fetchMongoUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('[AuthContext] Firebase user authenticated:', firebaseUser);
        const mongoUserData = await fetchMongoUserProfile(firebaseUser);
        setUser(firebaseUser); // Keep the Firebase user intact
        setMongoUser(mongoUserData); // Store MongoDB data separately
      } else {
        console.log('[AuthContext] No user authenticated, setting user to null.');
        setUser(null);
        setMongoUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const mongoUser = await fetchMongoUserProfile(firebaseUser);
      if (mongoUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          profilepicture: firebaseUser.photoURL,
          ...mongoUser,
        });
      }
    } catch (error) {
      console.error('[AuthContext] Google login error:', error);
    }
  };

  // Email/password login
  const handleLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      const mongoUser = await fetchMongoUserProfile(firebaseUser);
      if (mongoUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          ...mongoUser,
        });
      }
    } catch (error) {
      console.error('[AuthContext] Login failed:', error.message);
    }
  };

  // Email/password sign-up
  const handleSignUp = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      await firebaseUser.updateProfile({ displayName });
      const mongoUser = await fetchMongoUserProfile(firebaseUser);
      if (mongoUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          ...mongoUser,
        });
      }
    } catch (error) {
      console.error('[AuthContext] Sign-up failed:', error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('[AuthContext] User logged out.');
      setUser(null);
    } catch (error) {
      console.error('[AuthContext] Logout failed:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, mongoUser, handleGoogleLogin, handleLogin, handleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
