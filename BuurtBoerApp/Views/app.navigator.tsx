// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Schedule_Overview from './Schedule_Overview';
import LoginScreen from './Login';
import ForgotPasswordScreen from './Forgot_Password';
import Schedule_Form from './Schedule_Form';
import Schedule_Form_Inac from './Schedule_Form_Inactive';
import ChangePassword from './Change_Password';

const { Navigator, Screen} = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Login'>
        <Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Screen>
        <Screen name='Schedule' component={Schedule_Overview} options={{headerShown: false}}></Screen>
        <Screen name='Schedule_Form' component={Schedule_Form} options={{headerShown: false}}></Screen>
        <Screen name='Schedule_Form_Inac' component={Schedule_Form_Inac} options={{headerShown: false}}></Screen>
        <Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{headerShown: false}}></Screen>
        <Screen name='ChangePassword' component={ChangePassword} options={{headerShown: false}}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// ur stupid
