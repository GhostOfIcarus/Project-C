import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { before_login } from './css/before_login';
import loginData from './../Models/loginData.json';

interface User {
  email: string;
  password: string;
}

interface ForgotPasswordProps {
  navigation: any;
}

const Forgot_Password = (props: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');

  const ChangePasswordScreen = (user: User) => {
    // Navigate to the ChangePassword screen and pass the user data
    props.navigation.navigate("ChangePassword", { user });
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleSend = () => {
    // Check if the entered email exists in the JSON file
    const user = loginData.users.find((u: User) => u.email === email);

    if (user) {
      // Email exists, navigate to the ChangePassword screen with user data
      ChangePasswordScreen(user);
    } else {
      // Email doesn't exist, show an alert
      Alert.alert('Email Not Found', 'The entered email does not exist in our records.');
    }
  };
  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={before_login.container}>
        <View style={before_login.content_div}>
          <View style={before_login.img_div}>
            <Image
              source={require('./img/buurtboer_logo.png')}
              style={before_login.image}
            />
          </View>
          <View style={before_login.content_header_div}>
              <Text style={before_login.content_header}>Wachtwoord vergeten </Text>
          </View>
          <TextInput
            placeholder="E-mail"
            style={before_login.input}
            onChangeText={handleEmailChange}
          />
          <TouchableOpacity style={[before_login.buttons, before_login.buttons_space]} onPress={handleSend}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Verstuur</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Forgot_Password;