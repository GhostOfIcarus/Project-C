import React, { useCallback, useEffect, useState } from 'react';
import { View, Switch, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { basestyles } from './css/styles';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

import Schedule from './../Models/Schedule'

interface WeekOverviewFormProps 
{
  navigation: any;
  route: any;
}

let isActive = false;
let buttonText = 'Indienen';
let isDisabled = false;

const WeekOverviewForm = (props: WeekOverviewFormProps) => {
  const { employee } = props.route.params;
  const now = new Date();
  const startOfTheYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((now.getTime() - startOfTheYear.getTime()) / 86400000) + startOfTheYear.getDay() + 1) / 7);
  

  useEffect(() => {
    const fetchScheduleData = async () => {
      const employeeId = employee.id; // Replace this with the actual employee's ID
      const response = await fetch('http://10.0.2.2:5000/api/employee/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: employeeId, week: weekNumber}),
      });
  
      if (!response.ok) {
        console.error(`HTTP ${response.status}: ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      console.log(data); // inspect the response
    };
  
    fetchScheduleData();
  }, []);

  const { t } = useTranslation();
  const Schedule_Form_Inactive = () => props.navigation.navigate("Schedule_Form_Inac") 
  const Settings = () => props.navigation.navigate("Settings", { employee })

  const [isSchedule, setSchedule] = useState(false);

  const [isMonday, setMonday] = useState(false);
  const [isTuesday, setTuesday] = useState(false);
  const [isWednesday, setWednesday] = useState(Schedule.loadSchedule().wednesday);
  const [isThursday, setThursday] = useState(false);
  const [isFriday, setFriday] = useState(false);
  const [isSaturday, setSaturday] = useState(false);
  const [isSunday, setSunday] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadSchedule = async () => {
        const sched = Schedule.loadSchedule();
        setMonday(sched.monday);
        setTuesday(sched.tuesday);
        setWednesday(sched.wednesday);
        setThursday(sched.thursday);
        setFriday(sched.friday);
        setSaturday(sched.saturday);
        setSunday(sched.sunday);
      };
    loadSchedule();
    }, [])
  );

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
              <Text style={basestyles.centered_text_white}>{"\n"}{t('week')}{"\n"}43{"\n"}</Text>
            </View>
            
            {/* Monday */}
            <View style={[basestyles.checkbox_text_div, basestyles.top_padding]}>
              <CheckBox
                disabled={isDisabled}
                value={isMonday}
                onValueChange={(newValue) => setMonday(newValue)}
                tintColors={{ true: '#099F91', false: 'black' }}
              />
                <Text style={basestyles.centered_text_black}>{t('monday')}</Text>
            </View>

            {/* Tuesday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isTuesday}
                    onValueChange={(newValue) => setTuesday(newValue)}
                    tintColors={{ true: '#099F91', false: 'black' }}
                />
                <Text style={basestyles.centered_text_black}>{t('tuesday')}</Text>
            </View>

            {/* Wednesday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isWednesday}
                    onValueChange={(newValue) => setWednesday(newValue)}
                    tintColors={{ true: '#099F91', false: 'black' }}
                />
                <Text style={basestyles.centered_text_black}>{t('wednesday')}</Text>
            </View>

            {/* Thursday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isThursday}
                    onValueChange={(newValue) => setThursday(newValue)}
                    tintColors={{ true: '#099F91', false: 'black' }}
                />
                <Text style={basestyles.centered_text_black}>{t('thursday')}</Text>
            </View>

            {/* Friday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isFriday}
                    onValueChange={(newValue) => setFriday(newValue)}
                    tintColors={{ true: '#099F91', false: 'black' }}
                />
                <Text style={basestyles.centered_text_black}>{t('friday')}</Text>
            </View>

            {/* Saturday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isSaturday}
                    onValueChange={(newValue) => setSaturday(newValue)}
                    tintColors={{ true: '#099F91', false: 'black' }}
                />
                <Text style={basestyles.centered_text_black}>{t('saturday')}</Text>
            </View>

            {/* Sunday */}
            <View style={basestyles.checkbox_text_div}>
                <CheckBox
                    disabled={isDisabled}
                    value={isSunday}
                    onValueChange={(newValue) => setSunday(newValue)}
                    tintColors={{ true: '#099F91', false: 'black' }}
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

          <TouchableOpacity style={basestyles.button} onPress={Schedule_Form_Inactive}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('submit')}</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      
    </ScrollView>
  );
};

export default WeekOverviewForm;



