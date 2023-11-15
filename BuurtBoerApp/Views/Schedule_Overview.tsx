import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { basestyles } from './css/styles';

interface WeekOverviewScreenProps
{
  navigation: any;
}

const WeekOverviewScreen = (props: WeekOverviewScreenProps) => {
  
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form")

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
            <View style={basestyles.centered_text_div}>
              <Text style={basestyles.nav_bar_text}>Rooster overzicht</Text>
            </View>
          </View>
      </View>

      <View style={basestyles.schedule_padding}>
        <View style={basestyles.schedule_div_overview}>
          <View style={basestyles.centered_text_div}>
              <Text style={basestyles.centered_text_black}>U heeft uw Rooster voor deze week nog niet ingevuld.</Text>
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
