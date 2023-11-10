// HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements'

interface WeekOverviewFormProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

const WeekOverviewForm = (props: WeekOverviewFormProps) => {

    const [isChecked, setIsChecked] = useState(false);
    
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
            <View style={styles.centered_text_square}>
                <CheckBox style={styles.unchecked_box}
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    containerStyle={{ width: 25}}
                />
                <Text style={styles.centered_text}>Monday</Text>
            </View>

          <TouchableOpacity style={styles.buttons}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Indienen</Text>
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
    paddingVertical: width * 0.05,
    marginHorizontal: height * 0.05,
    marginVertical: height * 0.25,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowRadius: 10,
  },
  centered_text_square: 
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  padding:
  {
    padding: width * 0.025,
  },
  centered_text: 
  { color: 'black', 
  fontWeight: '600', 
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
  unchecked_box:
  {
    color: 'Black'
  },
});

export default WeekOverviewForm;
