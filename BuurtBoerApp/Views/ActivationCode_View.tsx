import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import ActivateAccountController from '../Controllers/Activation_Code_Controller';
import { useTranslation } from 'react-i18next';

interface ChangePasswordProps {
  navigation: any;
  route: any;
}

const ActivateAccountScreen = (props: ChangePasswordProps) => {
  const { t } = useTranslation();
  const [activation_code, setActivationCode] = useState('');

  const employee_mail: string  = props.route.params.employee_mail;
  const { page_key } = props.route.params;

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

          {/* Activation code input */}
          <TextInput
            placeholder={t('activation_code')}
            style={before_login.input}
            value={activation_code}
            onChangeText={setActivationCode}
          />
         
          {/* Change Password button */}
          <TouchableOpacity style={before_login.buttons} onPress={() => ActivateAccountController.ActivationCodeCheck(employee_mail, activation_code, t, props.navigation, page_key)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('send')}</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ActivateAccountScreen;