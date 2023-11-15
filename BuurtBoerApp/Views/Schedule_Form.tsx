import React, { useState } from 'react';
import { View, Switch, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { basestyles } from './css/styles';
import CheckBox from '@react-native-community/checkbox';

interface WeekOverviewFormProps 
{
  navigation: any;
}

let isActive = false;
let buttonText = 'Indienen';
let isDisabled = false;

const WeekOverviewForm = (props: WeekOverviewFormProps) => {

  const Schedule_Form_Inactive = () => props.navigation.navigate("Schedule_Form_Inac") 
  
  const [isSchedule, setSchedule] = useState(false);

  const [isMonday, setMonday] = useState(false);
  const [isTuesday, setTuesday] = useState(false);
  const [isWednesday, setWednesday] = useState(false);
  const [isThursday, setThursday] = useState(false);
  const [isFriday, setFriday] = useState(false);
  const [isSaturday, setSaturday] = useState(false);
  const [isSunday, setSunday] = useState(false);

  let changeStatus = (Status: boolean) =>
  {
    if (Status)
    {
      buttonText = 'Indienen';
    }
    else
    {
      buttonText = 'Bewerken';
    }

    if (Status)
    {
      isDisabled = false;
    }
    else
    {
      isDisabled = true;
    }

    isActive = !Status;
  }

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
        <View style={basestyles.schedule_div_form}>
            
            <View style={basestyles.schedule_week_div}>
              <Text style={basestyles.centered_text_white}>{"\n"}Week{"\n"}43{"\n"}</Text>
            </View>
            
            {/* Monday */}
            <View style={[basestyles.checkbox_text_div, basestyles.top_padding]}>
                <CheckBox
                    disabled={isDisabled}
                    value={isMonday}
                    onValueChange={(newValue) => setMonday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Maandag</Text>
            </View>

            {/* Tuesday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isTuesday}
                    onValueChange={(newValue) => setTuesday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Dinsdag</Text>
            </View>

            {/* Wednesday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isWednesday}
                    onValueChange={(newValue) => setWednesday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Woensdag</Text>
            </View>

            {/* Thursday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isThursday}
                    onValueChange={(newValue) => setThursday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Donderdag</Text>
            </View>

            {/* Friday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isFriday}
                    onValueChange={(newValue) => setFriday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Vrijdag</Text>
            </View>

            {/* Saturday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isSaturday}
                    onValueChange={(newValue) => setSaturday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Zaterdag</Text>
            </View>

            {/* Sunday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isSunday}
                    onValueChange={(newValue) => setSunday(newValue)}
                />
                <Text style={basestyles.centered_text_black}>Zondag</Text>
            </View>

            {/* Keep schedule switch */}
            <View style={basestyles.switch_text_div}>
              <Text style={basestyles.centered_text_small}>Onthoud Rooster</Text>
              <Switch
                onValueChange={previousState => setSchedule(previousState)}
                value={isSchedule}
              />
            </View>

          <TouchableOpacity style={basestyles.button} onPress={Schedule_Form_Inactive}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
};

export default WeekOverviewForm;



