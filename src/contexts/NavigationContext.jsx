import { createContext } from 'react';

export const NavigationContext = createContext({
  currentStep: 0,
  setCurrentStep: () => {},
});
