// generic react native imports
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Switch, Dimensions } from 'react-native';
import { basestyles } from './css/styles';
import { useTranslation } from 'react-i18next';
import i18next from './../Controllers/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// props
interface SettingsProps 
{
  navigation: any;
  route: any;
}

// main code
const SettingsScreen = (props: SettingsProps) => 
{
  // for the languages
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);

  // toggles the languages
  const toggleLanguage = async () => 
  {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    await AsyncStorage.setItem('language', JSON.stringify(newLanguage));
  };

  // makes sure employee data gets transferred between screens
  const { employee } = props.route.params;

  // navigation to other pages
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form",  { employee })
  const Change_Password = () => props.navigation.navigate("ChangePassword", { employee })

  // handles the login
  const handleLogout = async () => 
  {
    // clears the users data from async storage
    await AsyncStorage.removeItem('user');
  
    // navigates back to the login screen
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // var for notification switch
  const [isNotif, setNotif] = useState(true);

  // takes dimensions from phone for dynamic screens
  const { width, height } = Dimensions.get('window');

  // screen
  return (
    // base container
    <ScrollView contentContainerStyle={basestyles.container}>

      {/* nav bar */}
      <View style={basestyles.nav_bar_div}>

        {/* corner logo */}
        <View style={basestyles.nav_bar_image_div}>
          <Image
            source={require('./img/buurtboer_logo_no_texto.png')}
            style={basestyles.nav_bar_image}
          />
        </View>

        {/* nav bar title */}
        <View style={basestyles.nav_bar_title_div}>
            <Text style={basestyles.nav_bar_title}>{t('settingsHeader')}</Text>
        </View>

        {/* back icon */}
        <View style={basestyles.nav_bar_settings_div}>
          <TouchableOpacity onPress={Schedule_Form}>
            <Image source={require('./img/arrow_icon.png')} style={basestyles.nav_bar_settings} />
          </TouchableOpacity>
        </View>
      </View>

      {/* settings */}
      <View style={basestyles.schedule_padding}>
        <View style={basestyles.settings_div}>

          {/* name */}
          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('name')}</Text>
              <Text style={basestyles.text_gray}>{employee.firstName}</Text>
          </View>

          {/* surname */}
          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('lastName')}</Text>
              <Text style={basestyles.text_gray}>{employee.lastName}</Text>

          </View>

          {/* company */}
          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('company')}</Text>
              <Text style={basestyles.text_gray}>{employee.companyName}</Text>
          </View>

          {/* email */}
          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('email')}</Text>
              <Text style={basestyles.text_gray}>{employee.email}</Text>
          </View>

          {/* language select */}
          <View style={basestyles.left_aligned_text_div}>

            {/* flags */}
            <View style={basestyles.flags}>

              {/* english */}
              <TouchableOpacity onPress={toggleLanguage} disabled={language === 'en'}>
                <Image 
                  style={language === 'en' ? basestyles.inactive_flag : basestyles.active_flag} 
                  source={require('./img/en_flag.png')} 
                />
              </TouchableOpacity>

              {/* dutch */}
              <TouchableOpacity onPress={toggleLanguage} disabled={language === 'nl'}>
                <Image 
                  style={language === 'nl' ? basestyles.inactive_flag : basestyles.active_flag} 
                  source={require('./img/nl_flag.png')} 
                />
              </TouchableOpacity>

            </View>
          </View>

          {/* notifications switch */}
          <View style={[basestyles.switch_right_text_div, {marginLeft: width * 0.33,}]}>
            <Text style={basestyles.text_small}>{t('notifications')}</Text>
            <Switch
              onValueChange={previousState => setNotif(previousState)}
              value={isNotif}
              trackColor={{false: "#B6B6B6", true: "#099F91"}}
            />
          </View>

          {/* change password */}
          <TouchableOpacity style={basestyles.button} onPress={Change_Password}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('changePassword')}</Text>
          </TouchableOpacity>

          {/* logout */}
          <TouchableOpacity style={basestyles.button} onPress={handleLogout}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('logout')}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
