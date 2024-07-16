import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {StockProvider} from './src/context/StockContext';
import {AlertProvider} from './src/context/AlertContext';

export default function App() {
  return (
    <StockProvider>
      <AlertProvider>
        <AppNavigator />
      </AlertProvider>
    </StockProvider>
  );
}
