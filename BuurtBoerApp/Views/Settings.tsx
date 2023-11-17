// HomeScreen.js
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { basestyles } from './css/styles';
interface SettingsProps {
  navigation: any;
}

const SettingsScreen = (props: SettingsProps) => {
  
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form")
  const Change_Password = () => props.navigation.navigate("Change_Password") 

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
            <Text style={basestyles.nav_bar_title}>Instellingen</Text>
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
              <Text style={basestyles.text_black}>Naam: ...</Text>
          </View>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>Achternaam: ...</Text>
          </View>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>Bedrijf: ...</Text>
          </View>

          <View style={basestyles.left_aligned_text_div}>
              <Text style={basestyles.text_black}>Email: ...</Text>
          </View>

          <View style={basestyles.switch_left_text_div}>

            <Text style={basestyles.text_black}>Notificaties  </Text>

            <Switch
              onValueChange={previousState => setNotif(previousState)}
              value={isNotif}
            />
            
          </View>

          <TouchableOpacity style={basestyles.button} onPress={Change_Password}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Verander Wachtwoord</Text>
          </TouchableOpacity>

        </View>
      </View>
      
    </ScrollView>
  );
};

export default SettingsScreen;
