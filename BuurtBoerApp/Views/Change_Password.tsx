import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { before_login } from './css/before_login';
import loginData from './../Models/loginData.json';

interface User {
  email: string;
  password: string;
}

interface ChangePasswordProps {
  navigation: any;
  route: any;
}

const Change_Password = (props: ChangePasswordProps) => {
  const { user } = props.route.params;
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

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      // Passwords match, update the password in the JSON file
      const updatedUsers = loginData.users.map(u =>
        u.email === user.email ? { ...u, password } : u
      );

      // Update the JSON file with the new user data
      loginData.users = updatedUsers;

      Alert.alert('Password Changed', 'Your password has been successfully changed.');
      login();
    } else {
      // Passwords don't match, show an alert
      Alert.alert('Password Mismatch', 'The entered passwords do not match. Please try again.');
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
          <TouchableOpacity style={before_login.buttons} onPress={handleChangePassword}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Verstuur</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Change_Password;