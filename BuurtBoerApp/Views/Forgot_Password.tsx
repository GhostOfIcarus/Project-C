import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import { handleSend } from './../Controllers/ForgotPassword';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPassword = (props: ForgotPasswordScreenProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
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
              <Text style={before_login.content_header}>{t('forgotPasswordHeader')}</Text>
          </View>
          <TextInput
            placeholder={t('email')}
            style={before_login.input}
            onChangeText={handleEmailChange}
          />
          <TouchableOpacity style={[before_login.buttons, before_login.buttons_space]} onPress={() => handleSend(email, props.navigation)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('send')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;