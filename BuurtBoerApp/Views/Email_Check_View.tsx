import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import EmailCheckController from '../Controllers/Email_Check_Controller';
import { useTranslation } from 'react-i18next';

interface EmailCheckControllerScreenProps {
  navigation: any;
  route: any;
}

const ForgotPassword = (props: EmailCheckControllerScreenProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const { page_key } = props.route.params;

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
                {page_key == "change_password" ? (
                  <Text style={before_login.content_header}>{t('forgotPasswordHeader')} </Text>
                ) : page_key == "activate_account" ? (
                  <Text style={before_login.content_header}>{t('activateaccount')}</Text>
                ) : null}
            </View>

          {/* Email Input */}
          <TextInput
            placeholder={t('email')}
            style={before_login.input}
            onChangeText={handleEmailChange}
          />
          
          {/* Send button */}
          <TouchableOpacity style={[before_login.buttons, before_login.buttons_space]} onPress={() => EmailCheckController.handleEmailSend(email, props.navigation, t, page_key)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('send')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;