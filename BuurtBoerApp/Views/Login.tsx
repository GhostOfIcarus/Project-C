import React, { useEffect, useState } from 'react';
import { Switch, LogBox, View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import { useLoginController } from './../Controllers/Login';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreLogs(['Using Math.random is not cryptographically secure!']);
interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {
  
  useEffect(() => {
    const checkLoggedIn = async () => {
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

  const {
    language,
    showPassword,
    toggleLanguage,
    toggleShowPassword,
    handleLogin,
  } = useLoginController();

  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const Schedule = () => props.navigation.navigate("Schedule_Form")

  const Create_Account = () => props.navigation.navigate("CreateAccount")

  const ForgotPassword = () => props.navigation.navigate("ForgotPassword")

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
          <View style={before_login.rememberMeRow}>
            <Text style={{marginVertical: 10, marginHorizontal: 5, justifyContent: 'flex-start' }}>{t('rememberMe')}</Text>
            <Switch
              style={{justifyContent: 'flex-start'}}
              value={rememberMe}
              onValueChange={setRememberMe}
            />
          </View>
          <TouchableOpacity style={before_login.buttons} onPress={() => handleLogin(email, password, props.navigation, rememberMe)}>
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
          <View style={before_login.flags_div}>
            <View style={before_login.flags}>
              <TouchableOpacity onPress={toggleLanguage} disabled={language === 'en'}>
                <Image 
                  style={language === 'en' ? before_login.inactiveFlag : before_login.activeFlag} 
                  source={require('./img/en_flag.png')} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLanguage} disabled={language === 'nl'}>
                <Image 
                  style={language === 'nl' ? before_login.inactiveFlag : before_login.activeFlag} 
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