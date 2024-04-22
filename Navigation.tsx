// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import LoginScreen from './app/feature/login/Login';
import RegisterScreen from './app/feature/register/RegistrationPage';
import HomeScreen from './app/feature/home/Home';
import { useAuth } from './app/store/hooks/useAuth';
import Profile from './app/feature/profile/Profile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const Navigation = () => {
  const { session } = useAuth();

  return (
    <NavigationContainer>
      {session ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
