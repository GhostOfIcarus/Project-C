// HomeScreen.js
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { basestyles } from './css/styles';
import { useTranslation } from 'react-i18next';
import i18next from './../Controllers/i18next';

interface SettingsProps {
  navigation: any;
}

const SettingsScreen = (props: SettingsProps) => {
  const { t } = useTranslation();

  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'nl' : 'en';
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  const Schedule_Form = () => props.navigation.navigate("Schedule_Form")
  const Change_Password = () => props.navigation.navigate("Change_Password") 
  const Login = () => props.navigation.navigate("Login")

  const [isNotif, setNotif] = useState(false);

  return (
    <ScrollView contentContainerStyle={basestyles.container}>
      <View style={basestyles.nav_bar_div}>

        <View style={basestyles.nav_bar_image_div}>
          <Image
            source={require('./img/buurtboer_logo_no_texto.png')}
            style={basestyles.nav_bar_image}
          />
        </View>

        <View style={basestyles.nav_bar_title_div}>
            <Text style={basestyles.nav_bar_title}>{t('settingsHeader')}</Text>
        </View>

        <View style={basestyles.nav_bar_settings_div}>
          <TouchableOpacity onPress={Schedule_Form}>
            <Image source={require('./img/arrow_icon.png')} style={basestyles.nav_bar_settings} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={basestyles.schedule_padding}>
        <View style={basestyles.settings_div}>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('name')}: ...</Text>
          </View>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('lastName')}: ...</Text>
          </View>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('company')}: ...</Text>
          </View>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>{t('email')}: ...</Text>
          </View>

          <View style={basestyles.switch_left_text_div}>

            <Text style={basestyles.text_black}>{t('notifications')}  </Text>

            <Switch
              onValueChange={previousState => setNotif(previousState)}
              value={isNotif}
              trackColor={{false: "#B6B6B6", true: "#099F91"}}
            />
            
          </View>

          <View style={basestyles.left_aligned_text_div}>
            <View style={basestyles.flags}>
              <TouchableOpacity onPress={toggleLanguage} disabled={language === 'en'}>
                <Image 
                  style={language === 'en' ? basestyles.inactiveFlag : basestyles.activeFlag} 
                  source={require('./img/en_flag.png')} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLanguage} disabled={language === 'nl'}>
                <Image 
                  style={language === 'nl' ? basestyles.inactiveFlag : basestyles.activeFlag} 
                  source={require('./img/nl_flag.png')} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={basestyles.button} onPress={Change_Password}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('changePassword')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={basestyles.button} onPress={Login}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('logout')}</Text>
          </TouchableOpacity>

        </View>
      </View>
      
    </ScrollView>
  );
};

export default SettingsScreen;
