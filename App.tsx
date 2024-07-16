import React from 'react';
import {StockProvider} from './src/context/StockContext';
import {AlertProvider} from './src/context/AlertContext';
import {Auth0Provider} from 'react-native-auth0';
import {AuthProvider} from './src/context/AuthContext';
import Routes from './src/navigation/Routes';
import {URL_AUTH0_CLIENT_ID, URL_AUTH0_DOMAIN} from '@env';

export default function App() {
  return (
    <Auth0Provider domain={URL_AUTH0_DOMAIN} clientId={URL_AUTH0_CLIENT_ID}>
      <AuthProvider>
        <StockProvider>
          <AlertProvider>
            <Routes />
          </AlertProvider>
        </StockProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}
