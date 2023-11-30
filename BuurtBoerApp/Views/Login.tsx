import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import { handleLogin } from './../Controllers/Login';
import { useTranslation } from 'react-i18next';
import i18next from './../Controllers/i18next';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {

  const { t } = useTranslation();

  const switchLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };


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
          <TouchableOpacity onPress={() => switchLanguage('en')}>
            <Text>Switch to English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchLanguage('nl')}>
            <Text>Switch to Dutch</Text>
          </TouchableOpacity>
        <View style={before_login.content_div}>
          <View style={before_login.img_div}>
            <Image
              source={require('./img/buurtboer_logo.png')}
              style={before_login.image}
            />
          </View>

          <TextInput
            placeholder={t('email')}
            style={before_login.input}
            onChangeText={handleEmailChange}
            placeholderTextColor="#979797"
            value={email}
          />
          <TextInput
            placeholder={t('password')}
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
            placeholderTextColor="#979797"
          />
          <View style={before_login.forgotPasswordRow}>
            <TouchableOpacity onPress={ForgotPassword}>
              <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>
                {showPassword ? t('hidePassword') : t('showPassword')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={before_login.buttons} onPress={() => handleLogin(email, password, props.navigation)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('login')}</Text>
          </TouchableOpacity>
          <View style={before_login.centered_text}>
            <Text style={{ color: 'black' }}>{t('or')}</Text>
          </View>

          <TouchableOpacity style={before_login.buttons} onPress={Schedule}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('google')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={before_login.buttons} onPress={Create_Account}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('microsoft')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;