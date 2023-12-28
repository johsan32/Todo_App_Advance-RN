import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import StackNavigator from './src/router/stackNavigator';
import TaskProvider from './src/context/AppContext';
export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </TaskProvider>
  );
}
