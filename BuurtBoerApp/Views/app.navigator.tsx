import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import ForgotPasswordScreen from './Forgot_Password';
import Schedule_Form from './Schedule_Form_View';
import ChangePassword from './Change_Password';
import CreateAccount from './Create_Account';
import Settings from './Settings';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Login'>
        <Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Screen>
        <Screen name='Schedule_Form' component={Schedule_Form} options={{headerShown: false}}></Screen>
        <Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{headerShown: false}}></Screen>
        <Screen name='ChangePassword' component={ChangePassword} options={{headerShown: false}}></Screen>
        <Screen name='CreateAccount' component={CreateAccount} options={{headerShown: false}}></Screen>
        <Screen name='Settings' component={Settings} options={{headerShown: false}}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
