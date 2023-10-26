// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule_Overview from './Schedule_Overview';
import LoginScreen from './Login';

const { Navigator, Screen} = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Login'>
        <Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Screen>
        <Screen name='Schedule' component={Schedule_Overview} ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
