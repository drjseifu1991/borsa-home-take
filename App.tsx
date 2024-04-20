import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreenOne from './app/feature/Login/Login';
import { store } from './app/store/app-store';

export default function App() {
  return (
    <Provider store={store}>
      <LoginScreenOne/>
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