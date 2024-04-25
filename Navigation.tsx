import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginPage, RegistrationPage, HomePage, ProfilePage } from './app/pages';
import { useAuth } from './app/store/hooks/useAuth';

// Create Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Authentication Stack for login and registration
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Register" component={RegistrationPage} />
  </Stack.Navigator>
);

// Main Stack for home and profile pages
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="Profile" component={ProfilePage} />
  </Stack.Navigator>
);

// Navigation component to switch between authentication and main stacks based on session
const Navigation = () => {
  const { session } = useAuth(); // Get session status from custom hook

  return (
    <NavigationContainer>
      {/* Render AuthStack if session is not active, otherwise render MainStack */}
      {session ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation; // Export the Navigation component
