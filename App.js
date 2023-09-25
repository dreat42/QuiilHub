import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';

import {
  NavigationNativeContainer,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from './src/screen/SignupScreen';
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import HomeStack from './src/screen/HomeStack';

import {MyContextProvider} from './src/screen/Components/Context/MyContextProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <MyContextProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">

          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
           <Stack.Screen name="homestack" component={HomeStack} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </MyContextProvider>
  );
};

export default App;
