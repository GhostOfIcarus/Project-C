import React, { useEffect, useState } from 'react';
import { Switch, LogBox, View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginController from './../Controllers/Login';
LogBox.ignoreLogs(['Using Math.random is not cryptographically secure!']);
interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {
  // Check if the user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      LoginController.sync_language();
      const user = await AsyncStorage.getItem('user');

      if (user) {
        const employee = JSON.parse(user);
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Schedule_Form', params: { employee } }],
        });
      }
    };

    checkLoggedIn();
  }, []);
  
  // Get the translation function
  const { t } = useTranslation();

  // Create the states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const Email_Check = (end_page: string) => props.navigation.navigate("EmailCheckScreen", { page_key: end_page });

  return (
    <ScrollView contentContainerStyle={before_login.test}>
    <KeyboardAvoidingView style={before_login.container}>
      
        <View style={before_login.content_div}>
          
          <View style={before_login.img_div}>
            <Image
              source={require('./img/buurtboer_logo.png')}
              style={before_login.image}
            />
          </View>
          {/* Email input */}
          <TextInput
            placeholder={t('email')}
            style={before_login.input}
            onChangeText={handleEmailChange}
            placeholderTextColor="#979797"
            value={email}
          />
          {/* Password input */}
          <TextInput
            placeholder={t('password')}
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
            placeholderTextColor="#979797"
          />
          <View style={before_login.forgotPasswordRow}>
            {/* Forgot password */}
            <TouchableOpacity onPress={() => Email_Check("change_password")}>
              <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
            {/* Show/hide password */}
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>
                {LoginController.showPassword ? t('hidePassword') : t('showPassword')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Remember me */}
          <View style={before_login.rememberMeRow}>
            <Text style={{marginVertical: 10, marginHorizontal: 5, justifyContent: 'flex-start' }}>{t('rememberMe')}</Text>
            <Switch
              style={{justifyContent: 'flex-start'}}
              value={rememberMe}
              onValueChange={setRememberMe}
            />
          </View>
          {/* Login button */}
          <TouchableOpacity style={before_login.buttons} onPress={() => LoginController.handleLogin(email, password, props.navigation, rememberMe, t)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('login')}</Text>
          </TouchableOpacity>
          <View style={before_login.centered_text}>
            <Text style={{ color: 'black' }}>{t('or')}</Text>
          </View>

          <TouchableOpacity style={before_login.buttons} onPress={() => LoginController.handleLogin2(props.navigation, rememberMe)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('google')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={before_login.buttons} onPress={() => Email_Check("activate_account")}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('microsoft')}</Text>
          </TouchableOpacity>
          {/* Select Language icons */}
          <View style={before_login.flags_div}>
            <View style={before_login.flags}>
              <TouchableOpacity onPress={LoginController.toggleLanguage} disabled={LoginController.language === 'en'}>
                <Image 
                  style={LoginController.language === 'en' ? before_login.inactiveFlag : before_login.activeFlag} 
                  source={require('./img/en_flag.png')} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={LoginController.toggleLanguage} disabled={LoginController.language === 'nl'}>
                <Image 
                  style={LoginController.language === 'nl' ? before_login.inactiveFlag : before_login.activeFlag} 
                  source={require('./img/nl_flag.png')} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    
  );
};

export default LoginScreen;