// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';

interface LoginScreenProps {
  navigation: any;
}

const Forgot_Password = (props: LoginScreenProps) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handlePasswordChange = (text: string) => {
      setPassword(text);
    };
  
    const handleConfirmPasswordChange = (text: string) => {
      setConfirmPassword(text);
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const login = () => props.navigation.navigate("Login");
  
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
                <Text style={before_login.content_header}>Account aanmaken</Text>
            </View>
            <TextInput
              placeholder="Nieuw wachtwoord"
              style={before_login.input}
              secureTextEntry={!showPassword}
              onChangeText={handlePasswordChange}
              value={password}
            />
            <TextInput
              placeholder="Herhaal wachtwoord"
              style={before_login.input}
              secureTextEntry={!showPassword}
              onChangeText={handleConfirmPasswordChange}
              value={confirmPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text style={{ color: '#099F91', marginVertical: '2%', textAlign: 'center', marginTop: 10 }}>
                {showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={before_login.buttons} onPress={login}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Verstuur</Text>
            </TouchableOpacity>
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default Forgot_Password;