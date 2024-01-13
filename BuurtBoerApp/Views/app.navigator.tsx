import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login_View';
import EmailCheckScreen from './Email_Check_View';
import Schedule_Form from './Schedule_Form_View';
import ChangePassword from './Change_Password_View';
import ActivationCodeScreen from './ActivationCode_View';
import Settings from './Settings_View';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Login'>
        <Screen name='Login' component={LoginScreen} options={{headerShown: false}}></Screen>
        <Screen name='Schedule_Form' component={Schedule_Form} options={{headerShown: false}}></Screen>
        <Screen name='EmailCheckScreen' component={EmailCheckScreen} options={{headerShown: false}}></Screen>
        <Screen name='ChangePassword' component={ChangePassword} options={{headerShown: false}}></Screen>
        <Screen name='ActivationCodeScreen' component={ActivationCodeScreen} options={{headerShown: false}}></Screen>
        <Screen name='Settings' component={Settings} options={{headerShown: false}}></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
