// generic react native imports
import React, {useEffect, useState } from 'react';
import { View, Switch, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// style sheet import
import { basestyles } from './css/styles';

// model and controller import
import ScheduleModel from '../Models/Schedule_Form_Model'
import ScheduleController from './../Controllers/Schedule_Form_Cont'

// props
interface WeekOverviewFormProps 
{
  navigation: any;
  route: any;
}

// main code
const WeekOverviewForm = (props: WeekOverviewFormProps) => 
{
  // makes sure employee data gets transferred between screens
  const { employee } = props.route.params;

  // navigation to other pages
  const Settings = () => props.navigation.navigate("Settings", { employee })

  // for the languages
  const { t } = useTranslation();

  // var for checking if the schedule i submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // var for checking if the employee wants to remember their schedule
  const [isSchedule, setSchedule] = useState(false);

  // vars to disable and enable the buttons
  const [isDisabled, setDisabled] = useState(false);

  // changes button text between submit and change
  const [buttonText, setButtonText] = useState('submit');

  // var for weeknumber shown at top. default is 0
  const [weekNumber, setWeekNumber] = useState<number>(0);

  // var for schedule id so we can use it again later
  const [scheduleId, setScheduleId] = useState<number | null>(null);

  // vars for the weekday booleans
  const [isMonday, setMonday] = useState(false);
  const [isTuesday, setTuesday] = useState(false);
  const [isWednesday, setWednesday] = useState(false);
  const [isThursday, setThursday] = useState(false);
  const [isFriday, setFriday] = useState(false);
  const [isSaturday, setSaturday] = useState(false);
  const [isSunday, setSunday] = useState(false);

  // a sort of method used when the screen gets loaded
  useEffect(() => 
  {
    const loadSchedule = async () => 
    {
      // gets the schedule data based on the logged in employee
      const [CurrentSchedule, submitted] = await ScheduleModel.fetchScheduleData(employee);

      // sets all the schedule data picked up with the fetch
      if (CurrentSchedule) 
      {
        // weeknumber and id
        setWeekNumber(CurrentSchedule.week);
        setScheduleId(CurrentSchedule.id);

        // weekdays
        setMonday(CurrentSchedule.monday);
        setTuesday(CurrentSchedule.tuesday);
        setWednesday(CurrentSchedule.wednesday);
        setThursday(CurrentSchedule.thursday);
        setFriday(CurrentSchedule.friday);
        setSaturday(CurrentSchedule.saturday);
        setSunday(CurrentSchedule.sunday);

        // the submitted boolean is set
        setIsSubmitted(submitted);

        // based on the submitted boolean, this part will set the state of the checkboxes etc.
        if (submitted)
        {
          // picks up data from controller based on boolean
          const CurrentState = ScheduleController.changeState(!isSubmitted);

          // sets it to respective variables
          setButtonText(CurrentState.buttonText);
          setDisabled(CurrentState.isDisabled);
        }
      }
      
      //  sets the remember schedule to the saved state of the employee
      setSchedule(employee.keepSchedule);
    };

    // actually starts the method
    loadSchedule();
  }, [employee]);

  // calculates the deadline date based on the fetched week number
  const wednesdayDate = ScheduleController.getWednesdayDate(weekNumber - 1);

  // this method is activated when the button is pressed
  const handleSubmit = async () => 
  {   
    // switches the submitted state 
    setIsSubmitted(prevState => !prevState);

    // picks up data from controller based on boolean
    const CurrentState = ScheduleController.changeState(!isSubmitted);

    // sets it to respective variables
    setButtonText(CurrentState.buttonText);
    setDisabled(CurrentState.isDisabled);

    // if submit is clicked, the schedule data wil get updated in the database
    if (!isSubmitted)
    {
      ScheduleModel.updateScheduleData(scheduleId ?? 0, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday);
      
      // also saves remember me state in employee data
      await ScheduleModel.updateRememberSchedule(employee, isSchedule);
      employee.keepSchedule = isSchedule;
      if (await AsyncStorage.getItem('user'))
      {
        await AsyncStorage.setItem('user', JSON.stringify(employee));
      }
    }
  }

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
            <Text style={basestyles.nav_bar_title}>{t('scheduleOverviewHeader')}</Text>
        </View>

        {/* settings icon */}
        <View style={basestyles.nav_bar_settings_div}>
          <TouchableOpacity onPress={Settings}>
            <Image source={require('./img/settings_icon.png')} style={basestyles.nav_bar_settings} />
          </TouchableOpacity>
        </View>
      </View>

      {/* schedule */}
      <View style={basestyles.schedule_padding}>
        <View style={basestyles.schedule_div_form}>
            
          {/* week number display */}
          <View style={basestyles.schedule_week_div}>
            <Text style={basestyles.centered_text_white}>{"\n"}{t('week')}{"\n"}{weekNumber}{"\n"}</Text>
          </View>
          
          {/* Monday */}
          <View style={[basestyles.checkbox_text_div, basestyles.top_padding]}>
            <CheckBox
              disabled={isDisabled}
              value={isMonday}
              onValueChange={(newValue) => setMonday(newValue)}
              tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}              
            />
            <Text style={[basestyles.centered_text_black, {color: isDisabled ? 'gray' : 'black'}]}>{t('monday')}</Text>
          </View>

          {/* Tuesday */}
          <View style={basestyles.checkbox_text_div}>
            <CheckBox
                disabled={isDisabled}
                value={isTuesday}
                onValueChange={(newValue) => setTuesday(newValue)}
                tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                />
            <Text style={[basestyles.centered_text_black, {color: isDisabled ? 'gray' : 'black'}]}>{t('tuesday')}</Text>
          </View>

          {/* Wednesday */}
          <View style={basestyles.checkbox_text_div}>
            <CheckBox
                disabled={isDisabled}
                value={isWednesday}
                onValueChange={(newValue) => setWednesday(newValue)}
                tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                />
            <Text style={[basestyles.centered_text_black, {color: isDisabled ? 'gray' : 'black'}]}>{t('wednesday')}</Text>
          </View>

          {/* Thursday */}
          <View style={basestyles.checkbox_text_div}>
            <CheckBox
                disabled={isDisabled}
                value={isThursday}
                onValueChange={(newValue) => setThursday(newValue)}
                tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                />
            <Text style={[basestyles.centered_text_black, {color: isDisabled ? 'gray' : 'black'}]}>{t('thursday')}</Text>
          </View>

          {/* Friday */}
          <View style={basestyles.checkbox_text_div}>
            <CheckBox
                disabled={isDisabled}
                value={isFriday}
                onValueChange={(newValue) => setFriday(newValue)}
                tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}              
                />
            <Text style={[basestyles.centered_text_black, {color: isDisabled ? 'gray' : 'black'}]}>{t('friday')}</Text>
          </View>

          {employee.isFullSchedule ? (
            <>
              {/* Saturday */}
              <View style={basestyles.checkbox_text_div}>
                <CheckBox
                  disabled={isDisabled}
                  value={isSaturday}
                  onValueChange={(newValue) => setSaturday(newValue)}
                  tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}
                />
                <Text style={[basestyles.centered_text_black, { color: isDisabled ? 'gray' : 'black' }]}>{t('saturday')}</Text>
              </View>

              {/* Sunday */}
              <View style={basestyles.checkbox_text_div}>
                <CheckBox
                  disabled={isDisabled}
                  value={isSunday}
                  onValueChange={(newValue) => setSunday(newValue)}
                  tintColors={{ true: isDisabled ? 'lightgray' : '#099F91', false: isDisabled ? 'gray' : 'black' }}
                />
                <Text style={[basestyles.centered_text_black, { color: isDisabled ? 'gray' : 'black' }]}>{t('sunday')}</Text>
              </View>
            </>
          ) : null}

          {/* keep schedule switch */}
          <View style={basestyles.switch_right_text_div}>
            <Text style={basestyles.text_small}>{t('rememberSchedule')}</Text>
            <Switch
              onValueChange={previousState => setSchedule(previousState)}
              value={isSchedule}
              disabled={isDisabled}
              trackColor={{ true: isDisabled ? 'lightgray' : '#099F91', false:'lightgray' }}
            />
          </View>

          {/* submit button */}
          <TouchableOpacity style={basestyles.button} onPress={handleSubmit}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t(buttonText)}</Text>
          </TouchableOpacity>

          {/* deadline reminder */}
          <Text style={basestyles.centered_text_small}>{t('deadline')}{wednesdayDate}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default WeekOverviewForm;



