import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authenticateUser } from '../config/firebase';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  selectedLanguage: 'English',
  selectedCrops: [],
  farmingType: '',
  onboardingCompleted: false,
  currentScreen: 'splash',
  loading: true,
  error: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_LANGUAGE':
      return { ...state, selectedLanguage: action.payload };
    case 'SET_CROPS':
      return { ...state, selectedCrops: action.payload };
    case 'SET_FARMING_TYPE':
      return { ...state, farmingType: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingCompleted: true };
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate splash screen delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Authenticate user
      const user = await authenticateUser();
      dispatch({ type: 'SET_USER', payload: user });
      
      // Check if onboarding is completed (in real app, this would come from storage/database)
      const onboardingCompleted = false; // This would be retrieved from AsyncStorage or Firestore
      
      if (onboardingCompleted) {
        dispatch({ type: 'COMPLETE_ONBOARDING' });
        dispatch({ type: 'SET_SCREEN', payload: 'home' });
      } else {
        dispatch({ type: 'SET_SCREEN', payload: 'onboarding' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_SCREEN', payload: 'onboarding' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};