import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, mongoUser } = useAuthContext();

  // Fetch user profile from the server
  const getUser = useCallback(async () => {
    console.log('[UserContext] getUser called. Current user:', user);

    if (!user) {
      console.warn('[UserContext] No user found, setting userProfile to null and stopping loading.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('[UserContext] Fetching Firebase token for user:', user.uid);
      const token = await user.getIdToken();
      console.log('[UserContext] Firebase token retrieved:', token);

      const response = await fetch(`/api/users/${user.uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('[UserContext] API response status:', response.status);
      if (!response.ok) {
        console.error('[UserContext] Failed to fetch user profile:', response.statusText);
        console.log(`Failed to fetch user profile: ${response.statusText}`);
        throw new Error(`Failed to fetch user profile: ${response.status}`);
      }

      const userData = await response.json();
      console.log('[UserContext] User data fetched successfully:', userData);
      console.log('[UserContext] User profile fetched successfully.');
      setUserProfile(userData);
    } catch (error) {
      console.error('[UserContext] Error fetching user profile:', error);
      console.log(`[UserContext] Error fetching user profile: ${error.message}`);
      setError('Failed to fetch user profile');
      setUserProfile(null);
    } finally {
      setLoading(false);
      console.log('[UserContext] Loading state set to false.');
    }
  }, [user, mongoUser]);

  // Update user profile in the database
  const updateUser = useCallback(async (updatedProfile) => {
    console.log('[UserContext] updateUser called with updatedProfile:', updatedProfile);

    if (!user || typeof user.getIdToken !== 'function') {
      console.warn('[UserContext] No user found or user.getIdToken is missing. updateUser aborted.');
      console.log('No authenticated user found or getIdToken missing; cannot update profile.');
      return;
    }

    try {
      const sanitizedProfile = {
        ...userProfile,
        ...updatedProfile,
        exams: updatedProfile.exams 
          ? updatedProfile.exams.map((exam) => exam._id || exam) 
          : userProfile.exams,
      };
      console.log('[UserContext] Sanitized profile for update:', sanitizedProfile);

      const token = await user.getIdToken();
      console.log('[UserContext] Token retrieved for update:', token);

      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sanitizedProfile),
      });

      console.log('[UserContext] Update response status:', response.status);
      if (!response.ok) {
        console.error('[UserContext] Failed to update user profile:', response.statusText);
        console.log(`Failed to update user profile: ${response.statusText}`);
        throw new Error('Failed to update user profile');
      }

      console.log('[UserContext] User profile updated successfully. Refreshing profile...');
      await getUser(); // Refresh profile after update
    } catch (err) {
      console.error('[UserContext] Error updating user profile:', err.message);
      console.log(`[UserContext] Error updating user profile: ${err.message}`);
      setError('Failed to update user profile');
    }
  }, [user, userProfile, getUser]);

  // Monitor user authentication state and fetch profile if authenticated
  useEffect(() => {
    console.log('[UserContext] useEffect triggered; user:', user);
    if (user) getUser();
  }, [user, getUser]);

  return {
    userProfile,
    loading,
    error,
    updateUser,
    refreshUserProfile: getUser,
  };
}

// Context provider setup
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userProfileState = useUserProfile();

  useEffect(() => {
    console.log('[UserProvider] UserContext updated with userProfile:', userProfileState.userProfile);
    console.log(`[UserProvider] UserContext updated with userProfile: ${JSON.stringify(userProfileState.userProfile)}`);
  }, [userProfileState.userProfile]);

  return (
    <UserContext.Provider value={userProfileState}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
