import React, {useEffect, useState } from 'react';
import { View, Switch, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { basestyles } from './css/styles';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';

import Schedule from '../Models/Schedule_Form_Model'
import ScheduleController from './../Controllers/Schedule_Form_Cont'

interface WeekOverviewFormProps 
{
  navigation: any;
  route: any;
}

const WeekOverviewForm = (props: WeekOverviewFormProps) => {
  const { employee } = props.route.params;

  const { t } = useTranslation();
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form", { employee }) 
  const Settings = () => props.navigation.navigate("Settings", { employee })

  const [isSchedule, setSchedule] = useState(false);

  const isDisabled = true;

  const [weekNumber, setWeekNumber] = useState<number | null>(null);

  const [isMonday, setMonday] = useState(false);
  const [isTuesday, setTuesday] = useState(false);
  const [isWednesday, setWednesday] = useState(false);
  const [isThursday, setThursday] = useState(false);
  const [isFriday, setFriday] = useState(false);
  const [isSaturday, setSaturday] = useState(false);
  const [isSunday, setSunday] = useState(false);

  useEffect(() => 
  {
    const loadSchedule = async () => 
    {
      const CurrentSchedule = await Schedule.fetchScheduleData(employee);

      if (CurrentSchedule) 
      {
        setWeekNumber(CurrentSchedule.week);
        
        setMonday(CurrentSchedule.monday);
        setTuesday(CurrentSchedule.tuesday);
        setWednesday(CurrentSchedule.wednesday);
        setThursday(CurrentSchedule.thursday);
        setFriday(CurrentSchedule.friday);
        setSaturday(CurrentSchedule.saturday);
        setSunday(CurrentSchedule.sunday);
      }
    };

    loadSchedule();
  }, [employee]);


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
        <View style={basestyles.schedule_div_form}>
            
            <View style={basestyles.schedule_week_div}>
              <Text style={basestyles.centered_text_white}>{"\n"}{t('week')}{"\n"}{weekNumber}{"\n"}</Text>
            </View>
            
            {/* Monday */}
            <View style={[basestyles.checkbox_text_div, basestyles.top_padding]}>
              <CheckBox
                disabled={isDisabled}
                value={isMonday}
                onValueChange={(newValue) => setMonday(newValue)}
                tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                />
                <Text style={basestyles.centered_text_black}>{t('monday')}</Text>
            </View>

            {/* Tuesday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isTuesday}
                    onValueChange={(newValue) => setTuesday(newValue)}
                    tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                    />
                <Text style={basestyles.centered_text_black}>{t('tuesday')}</Text>
            </View>

            {/* Wednesday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isWednesday}
                    onValueChange={(newValue) => setWednesday(newValue)}
                    tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                    />
                <Text style={basestyles.centered_text_black}>{t('wednesday')}</Text>
            </View>

            {/* Thursday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isThursday}
                    onValueChange={(newValue) => setThursday(newValue)}
                    tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                    />
                <Text style={basestyles.centered_text_black}>{t('thursday')}</Text>
            </View>

            {/* Friday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isFriday}
                    onValueChange={(newValue) => setFriday(newValue)}
                    tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                    />
                <Text style={basestyles.centered_text_black}>{t('friday')}</Text>
            </View>

            {/* Saturday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isSaturday}
                    onValueChange={(newValue) => setSaturday(newValue)}
                    tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                    />
                <Text style={basestyles.centered_text_black}>{t('saturday')}</Text>
            </View>

            {/* Sunday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isSunday}
                    onValueChange={(newValue) => setSunday(newValue)}
                    tintColors={{ true: '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                    />
                <Text style={basestyles.centered_text_black}>{t('sunday')}</Text>
            </View>

            {/* Keep schedule switch */}
            <View style={basestyles.switch_right_text_div}>
              <Text style={basestyles.centered_text_small}>{t('rememberSchedule')}</Text>
              <Switch
                onValueChange={previousState => setSchedule(previousState)}
                value={isSchedule}
                trackColor={{false: "#B6B6B6", true: "#099F91"}}
              />
            </View>

          <TouchableOpacity style={basestyles.button} onPress={Schedule_Form}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('change')}</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      
    </ScrollView>
  );
};

export default WeekOverviewForm;


