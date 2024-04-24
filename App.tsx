import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreenOne from './app/feature/login/Login';
import { store } from './app/store/app-store';
import RegistrationPage from './app/feature/register/RegistrationPage';
import Navigation from './Navigation';
import { PaperProvider } from 'react-native-paper';
import ErrorSnackbar from './app/feature/error/ErrorSnackBar';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation/>
        <ErrorSnackbar/>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});