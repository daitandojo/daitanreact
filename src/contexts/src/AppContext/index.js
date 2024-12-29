'use client';

import { createContext, useContext, useState } from 'react';
import { initialAppState } from '@/defaults/initialStates';

// Create AppContext
const AppContext = createContext();

// Custom hook to manage the application state
export function useAppState() {
  const [appState, setAppState] = useState(initialAppState);
  const [busy, setBusy] = useState(false);
  const [busyWith, setBusyWith] = useState('');

  const updateAppState = (key, value) => {
    setAppState((prevState) => ({ ...prevState, [key]: value }));
  };

  // Function to start busy state with a description
  const startBusy = (action) => {
    setBusy(true);
    setBusyWith(action);
  };

  // Function to stop busy state
  const stopBusy = () => {
    setBusy(false);
    setBusyWith('');
  };

  const setError = (newValue) => {
    updateAppState('error', newValue);
  };

  return {
    appState,
    updateAppState,
    busy,
    busyWith,
    startBusy,
    stopBusy,
    setError,
  };
}

// AppProvider that provides the app state to all children components
export function AppProvider({ children }) {
  const appState = useAppState();

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

// Hook to use the AppContext in components
export function useAppContext() {
  return useContext(AppContext);
}
