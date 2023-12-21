import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import ChangePasswordController from './../Controllers/Change_Password';
import Employee from '../Models/Employee_Model';
import { useTranslation } from 'react-i18next';

interface ChangePasswordProps {
  navigation: any;
  route: any;
}

const Change_Password = (props: ChangePasswordProps) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const employee: Employee = props.route.params.employee;
  const { page_key } = props.route.params;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                  <Text style={before_login.content_header}>{t('changePasswordHeader')} </Text>
                ) : page_key == "activate_account" ? (
                  <Text style={before_login.content_header}>{t('createAccountHeader')}</Text>
                ) : null}
            </View>

          <Text style={before_login.centered_text_small}>{t('password_requirements')}</Text>
          {/* New Password input */}
          <TextInput
            placeholder={t('newPassword')}
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
          />
          {/* Confirm Password input */}
          <TextInput
            placeholder={t('confirmPassword')}
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          {/* Hide / Show password */}
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={{ color: '#099F91', marginVertical: '2%', textAlign: 'center', marginTop: 10 }}>
              {showPassword ? t('hidePassword') : t('showPassword')}
            </Text>
          </TouchableOpacity>
          {/* Change Password button */}
          <TouchableOpacity style={before_login.buttons} onPress={() => ChangePasswordController.handleChangePassword(password, confirmPassword, props.navigation, employee, t, page_key)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('changePassword')}</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Change_Password;