// HomeScreen.js
import React, { useState } from 'react';
import { View, Switch, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { basestyles } from './css/styles';
import { useTranslation } from 'react-i18next';

interface WeekOverviewFormInactProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

const WeekOverviewFormInact = (props: WeekOverviewFormInactProps) => {
  const { t } = useTranslation();
  const Schedule_Form = () => props.navigation.navigate("Schedule_Form") 
  
  const [isSchedule, setSchedule] = useState(false);

  const [isMonday, setMonday] = useState(false);
  const [isTuesday, setTuesday] = useState(false);
  const [isWednesday, setWednesday] = useState(false);
  const [isThursday, setThursday] = useState(false);
  const [isFriday, setFriday] = useState(false);
  const [isSaturday, setSaturday] = useState(false);
  const [isSunday, setSunday] = useState(false);

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
            <View style={styles.centered_text_square}>
              <Text style={basestyles.nav_bar_text}>{t('scheduleOverviewHeader')}</Text>
            </View>
          </View>
      </View>

      <View style={styles.padding}>
        <View style={styles.schedule_div}>
            
            <View style={styles.week_div}>
              <Text style={styles.centered_text_white}>{"\n"}{t('week')}{"\n"}43{"\n"}</Text>
            </View>
            
            {/* Monday */}
            <View style={[styles.checkbox_text_div, styles.topPadding]}>
                <CheckBox
                    disabled={true}
                    value={isMonday}
                    onValueChange={(newValue) => setMonday(newValue)}
                />
                <Text style={styles.centered_text}>{t('monday')}</Text>
            </View>

            {/* Tuesday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={true}
                    value={isTuesday}
                    onValueChange={(newValue) => setTuesday(newValue)}
                />
                <Text style={styles.centered_text}>{t('tuesday')}</Text>
            </View>

            {/* Wednesday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={true}
                    value={isWednesday}
                    onValueChange={(newValue) => setWednesday(newValue)}
                />
                <Text style={styles.centered_text}>{t('wednesday')}</Text>
            </View>

            {/* Thursday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={true}
                    value={isThursday}
                    onValueChange={(newValue) => setThursday(newValue)}
                />
                <Text style={styles.centered_text}>{t('thursday')}</Text>
            </View>

            {/* Friday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={true}
                    value={isFriday}
                    onValueChange={(newValue) => setFriday(newValue)}
                />
                <Text style={styles.centered_text}>{t('friday')}</Text>
            </View>

            {/* Saturday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={true}
                    value={isSaturday}
                    onValueChange={(newValue) => setSaturday(newValue)}
                />
                <Text style={styles.centered_text}>{t('saturday')}</Text>
            </View>

            {/* Sunday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={true}
                    value={isSunday}
                    onValueChange={(newValue) => setSunday(newValue)}
                />
                <Text style={styles.centered_text}>{t('sunday')}</Text>
            </View>

            <View style={styles.switch_text_div}>
              <Text style={styles.centered_text_smol}>{t('rememberSchedule')}</Text>
              <Switch
                onValueChange={previousState => setSchedule(previousState)}
                value={isSchedule}
              />
            </View>

          <TouchableOpacity style={styles.buttons} onPress={Schedule_Form}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{t('change')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  schedule_div: 
  {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.05,
    marginHorizontal: height * 0.05,
    marginVertical: height * 0.05,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowRadius: 10,
  },
  centered_text_square: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
  },
  schedule_padding_div: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.01
  },
  week_div:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#099F91',
    marginHorizontal: width * 0.2
  },
  checkbox_text_div: 
  {
    paddingVertical: height * 0.01,
    flexDirection: 'row',
    marginLeft: width * 0.1,
  },
  switch_text_div: 
  {
    paddingVertical: height * 0.01,
    flexDirection: 'row',
    marginLeft: width * 0.27,
  },
  padding:
  {
    padding: width * 0.025,
  },
  topPadding:
  {
    paddingTop: width * 0.04,
  },
  centered_text: 
  { 
    color: 'gray', 
    fontSize: width * 0.05, 
    textAlign: 'center', 
  },
  centered_text_smol: 
  { 
    paddingTop: height * 0.004,
    color: 'gray', 
    fontSize: width * 0.03, 
  },
  centered_text_white: 
  { color: 'white', 
    fontSize: width * 0.05, 
    textAlign: 'center', 
  },
  buttons:
  {
    backgroundColor: '#F9834C',
    color: 'white',
    fontWeight: '600',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // For Android
  },
});

export default WeekOverviewFormInact;
