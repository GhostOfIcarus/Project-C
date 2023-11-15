// HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Switch, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface WeekOverviewFormInactProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

const WeekOverviewFormInact = (props: WeekOverviewFormInactProps) => {

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top_bar_div}>
          <View style={styles.leftContent}>
            <Image
              source={require('./img/buurtboer_logo_no_texto.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.rightContent}>
            <View style={styles.centered_text_square}>
              <Text style={styles.top_text}>Rooster overzicht</Text>
            </View>
          </View>
      </View>

      <View style={styles.padding}>
        <View style={styles.schedule_div}>
            
            <View style={styles.week_div}>
              <Text style={styles.centered_text_white}>{"\n"}Week{"\n"}43{"\n"}</Text>
            </View>
            
            {/* Monday */}
            <View style={[styles.checkbox_text_div, styles.topPadding]}>
                <CheckBox
                    disabled={false}
                    value={isMonday}
                    onValueChange={(newValue) => setMonday(newValue)}
                />
                <Text style={styles.centered_text}>Maandag</Text>
            </View>

            {/* Tuesday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={false}
                    value={isTuesday}
                    onValueChange={(newValue) => setTuesday(newValue)}
                />
                <Text style={styles.centered_text}>Dinsdag</Text>
            </View>

            {/* Wednesday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={false}
                    value={isWednesday}
                    onValueChange={(newValue) => setWednesday(newValue)}
                />
                <Text style={styles.centered_text}>Woensdag</Text>
            </View>

            {/* Thursday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={false}
                    value={isThursday}
                    onValueChange={(newValue) => setThursday(newValue)}
                />
                <Text style={styles.centered_text}>Donderdag</Text>
            </View>

            {/* Friday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={false}
                    value={isFriday}
                    onValueChange={(newValue) => setFriday(newValue)}
                />
                <Text style={styles.centered_text}>Vrijdag</Text>
            </View>

            {/* Saturday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={false}
                    value={isSaturday}
                    onValueChange={(newValue) => setSaturday(newValue)}
                />
                <Text style={styles.centered_text}>Zaterdag</Text>
            </View>

            {/* Sunday */}
            <View style={styles.checkbox_text_div}>
                <CheckBox
                    disabled={false}
                    value={isSunday}
                    onValueChange={(newValue) => setSunday(newValue)}
                />
                <Text style={styles.centered_text}>Zondag</Text>
            </View>

            <View style={styles.switch_text_div}>
              <Text style={styles.centered_text_smol}>Onthoud Rooster</Text>
              <Switch
                onValueChange={previousState => setSchedule(previousState)}
                value={isSchedule}
              />
            </View>

          <TouchableOpacity style={styles.buttons} onPress={Schedule_Form}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Bewerken</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: 
  {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#D9D9D9',
  },
  top_bar_div: {
    flexDirection: 'row', // Use row direction for horizontal layout
    width: width,
    height: height * 0.15,
    justifyContent: 'center',
    backgroundColor: '#099F91',
    shadowColor: 'black',
    shadowRadius: 10,
  },
  top_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: width * 0.06,
    marginTop: height * 0.02,
    fontWeight: 'bold',
    width: width
  },
  leftContent: {
    paddingLeft: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    flex: 1, // Takes 1/2 of the available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#099F91',
    height: width * 0.20,
    width: width * 0.20,
  },
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
