import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import { handleLogin } from './../Controllers/Login';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Schedule = () => props.navigation.navigate("Schedule")

  const Create_Account = () => props.navigation.navigate("CreateAccount")

  const ForgotPassword = () => props.navigation.navigate("ForgotPassword")

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={before_login.container}>
        <View style={before_login.content_div}>
          <View style={before_login.img_div}>
            <Image
              source={require('./img/buurtboer_logo.png')}
              style={before_login.image}
            />
          </View>

          <TextInput
            placeholder="E-mail"
            style={before_login.input}
            onChangeText={handleEmailChange}
            placeholderTextColor="#979797"
          />
          <TextInput
            placeholder="Wachtwoord"
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
            placeholderTextColor="#979797"
          />
          <View style={before_login.forgotPasswordRow}>
            <TouchableOpacity onPress={ForgotPassword}>
              <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>Wachtwoord vergeten?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>
                {showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={before_login.buttons} onPress={() => handleLogin(email, password, props.navigation)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>
          <View style={before_login.centered_text}>
            <Text style={{ color: 'black' }}>OF</Text>
          </View>

          <TouchableOpacity style={before_login.buttons} onPress={Schedule}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Login met Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={before_login.buttons} onPress={Create_Account}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Login met Microsoft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;