// LoginScreen.js
import React from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';

interface LoginScreenProps {
  navigation: any;
}

const Forgot_Password = (props: LoginScreenProps) => {
  
  const ChangePasswordScreen = () => props.navigation.navigate("ChangePassword")

  

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
            // Handle username input
          />
          <TouchableOpacity style={[before_login.buttons, before_login.buttons_space]} onPress={ChangePasswordScreen}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Verstuur</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Forgot_Password;