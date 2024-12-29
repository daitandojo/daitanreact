'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { initialUIState } from '@/defaults/initialStates';
import { useAppContext } from './AppContext';  // Import AppContext to access `busy` and `busyWith`
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Custom hook for managing UI state
function useUIState() {
  const [uiState, setUIState] = useState(initialUIState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Track visibility

  const { busy, busyWith } = useAppContext();  // Access busy and busyWith from AppContext

  const updateUIState = (key, value) => {
    setUIState((prevState) => ({ ...prevState, [key]: value }));
  };

  const showModal = (which) => {
    updateUIState('showingModal', which);
  };

  const setMessageForModal = (message) => {
    updateUIState('messageForModal', message);
  };

  const setProgressGeneration = (newValue) => {
    updateUIState('progressGeneration', newValue);
  };

  const setError = (error) => {
    updateUIState('error', error);
  };

  const clearError = () => {
    updateUIState('error', null);
  };

  const setSlideDirection = (direction) => {
    updateUIState('slideDirection', direction);
  };

  // Close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarVisible(false); // Explicitly set visible state to false
  };

  // Show snackbar when busy state changes
  useEffect(() => {
    if (busy) {
      setSnackbarOpen(true);
      setSnackbarVisible(true); // Keep track of the visibility
    } else {
      setSnackbarVisible(false);  // Hide the snackbar when busy is false
    }
  }, [busy]);

  // Automatically hide the snackbar after a certain duration even if busy persists
  useEffect(() => {
    if (snackbarVisible) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false);  // Close the snackbar after the auto-hide duration
      }, 3000); // Auto-hide duration (3 seconds)
      
      return () => clearTimeout(timer);  // Clear timeout if the component unmounts or busy state changes
    }
  }, [snackbarVisible]);

  return {
    uiState,
    updateUIState,
    showModal,
    setMessageForModal,
    setProgressGeneration,
    setError,
    clearError,
    setSlideDirection,
    snackbarOpen,
    handleSnackbarClose,
  };
}

// Create the UIContext
const UIContext = createContext();

// The UIProvider wraps your app and provides UI state management
export function UIProvider({ children }) {
  const uiState = useUIState();

  return (
    <UIContext.Provider value={uiState}>
      {children}

      {/* Snackbar to show when busy */}
      <Snackbar
        open={uiState.snackbarOpen}
        autoHideDuration={3000}  // Hide after 3 seconds
        onClose={uiState.handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={uiState.handleSnackbarClose} severity="info">
          {useAppContext().busyWith || 'Loading...'}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
}

// Hook to access the UIContext in components
export function useUIContext() {
  return useContext(UIContext);
}
