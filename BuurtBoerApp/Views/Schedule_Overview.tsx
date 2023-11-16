import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { basestyles } from './css/styles';

interface WeekOverviewScreenProps
{
  navigation: any;
  route: any;
}

const WeekOverviewScreen = (props: WeekOverviewScreenProps) => {

  const { user } = props.route.params;
  
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form")
  const Settings = () => props.navigation.navigate("Settings")

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
              <Text style={basestyles.nav_bar_title}>Rooster overzicht</Text>
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
              <Text style={basestyles.centered_text_black}>U heeft uw Rooster voor deze week nog niet ingevuld.</Text>
              <Text style={basestyles.centered_text_black}>
                Ingelogd als: {user.email}
              </Text>
          </View>

          <TouchableOpacity style={basestyles.button} onPress={Schedule_Form}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Vul Rooster in</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
};

export default WeekOverviewScreen;
