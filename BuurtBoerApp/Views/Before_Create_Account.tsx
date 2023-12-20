import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import ActivateAccountController from './../Controllers/Activate_Account_Controller';
import { useTranslation } from 'react-i18next';

interface ChangePasswordProps {
  navigation: any;
  route: any;
}

const ActivateAccountScreen = (props: ChangePasswordProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [activation_code, setActivationCode] = useState('');

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
              <Text style={before_login.content_header}>{t('activateaccount')} </Text>
          </View>

          <TextInput
            placeholder={t('email')}
            style={before_login.input}
            value={email}
            onChangeText={setEmail}
          />
          {/* Confirm Password input */}
          <TextInput
            placeholder={t('activation_code')}
            style={before_login.input}
            value={activation_code}
            onChangeText={setActivationCode}
          />
         
          {/* Change Password button */}
          <TouchableOpacity style={before_login.buttons} onPress={() => ActivateAccountController.ActivationCodeCheck(email, activation_code, t, props.navigation)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('changePassword')}</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ActivateAccountScreen;