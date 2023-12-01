import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { basestyles } from './css/styles';
import { useTranslation } from 'react-i18next';

interface WeekOverviewScreenProps
{
  navigation: any;
  route: any;
}

const WeekOverviewScreen = (props: WeekOverviewScreenProps) => {

  const { employee } = props.route.params;
  const { t } = useTranslation();
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form", { employee })
  const Settings = () => props.navigation.navigate("Settings", { employee })

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
              <Text style={basestyles.nav_bar_title}>{t('scheduleOverviewHeader')}</Text>
          </View>

          <View style={basestyles.nav_bar_settings_div}>
            <TouchableOpacity onPress={Settings}>
              <Image source={require('./img/settings_icon.png')} style={basestyles.nav_bar_settings} />
            </TouchableOpacity>
          </View>
      </View>

      <View style={basestyles.schedule_padding}>
        <View style={basestyles.schedule_div_overview}>
          <View style={basestyles.centered_text_div}>
              <Text style={basestyles.centered_text_black}>{t('scheduleNotFilled')}</Text>

          </View>

          <TouchableOpacity style={basestyles.button} onPress={Schedule_Form}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('fillSchedule')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
};

export default WeekOverviewScreen;
