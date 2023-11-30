import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { before_login } from './css/before_login';
import { handleChangePassword } from './../Controllers/Change_Password';
import Employee from './../Models/Employee';
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
              <Text style={before_login.content_header}>{t('changePasswordHeader')} </Text>
          </View>
          <TextInput
            placeholder={t('newPassword')}
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
          />
          <TextInput
            placeholder={t('confirmPassword')}
            style={before_login.input}
            secureTextEntry={!showPassword}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={{ color: '#099F91', marginVertical: '2%', textAlign: 'center', marginTop: 10 }}>
              {showPassword ? t('hidePassword') : t('showPassword')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={before_login.buttons} onPress={() => handleChangePassword(password, confirmPassword, props.navigation, employee)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('changePassword')}</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Change_Password;