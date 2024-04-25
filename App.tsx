import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { store } from './app/store/app-store';
import { ErrorSnackbar } from './app/components';
import Navigation from './Navigation';
import { Text, View } from 'react-native';

// App component serving as the root component of the application
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
          <Navigation /> 
        <ErrorSnackbar /> 
      </PaperProvider>
    </Provider>
  );
}
