// HomeScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView   } from 'react-native';

interface WeekOverviewScreenProps {
  navigation: any;
}

const WeekOverviewScreen = (props: WeekOverviewScreenProps) => {
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
              <Text style={styles.centered_text}>U heeft uw Rooster voor deze week nog niet ingevuld.</Text>
          </View>

          <TouchableOpacity style={styles.buttons}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Vul Rooster in</Text>
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
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  top_bar_div: {
    flexDirection: 'row', // Use row direction for horizontal layout
    width: '100%',
    height: 105,
    justifyContent: 'center',
    backgroundColor: '#099F91',
    shadowColor: 'black',
    shadowRadius: 10,
    marginTop: -20,
  },
  top_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',
    width: '100%'
  },
  leftContent: {
    paddingLeft: 25,
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
    height: 75,
    width: 75,
  },
  schedule_div: 
  {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginHorizontal: 20,
    marginVertical: 250,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowRadius: 10,
  },
  centered_text_square: 
  {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  padding:
  {
    padding: 25,
  },
  centered_text: 
  { color: 'black', 
  fontWeight: '600', 
  fontSize: 20, 
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

export default WeekOverviewScreen;
