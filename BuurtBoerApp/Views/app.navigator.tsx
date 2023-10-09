// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import LoginScreen from './Login';

const { Navigator, Screen} = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Login'>
        <Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Screen>
        <Screen name='Home' component={HomeScreen} ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
