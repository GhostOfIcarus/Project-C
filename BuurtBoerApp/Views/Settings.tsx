// HomeScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { basestyles } from './css/styles';
interface SettingsProps {
  navigation: any;
}

const SettingsScreen = (props: SettingsProps) => {
  
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
            <Text style={basestyles.nav_bar_title}>Instellingen</Text>
        </View>

        <View style={basestyles.nav_bar_settings_div}>
          <TouchableOpacity onPress={Schedule_Form}>
            <Image source={require('./img/arrow_icon.png')} style={basestyles.nav_bar_settings} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={basestyles.schedule_padding}>
        <View style={basestyles.schedule_div_form}>
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

export default SettingsScreen;
