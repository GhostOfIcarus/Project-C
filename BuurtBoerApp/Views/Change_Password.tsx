// LoginScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView   } from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const Change_Password = (props: LoginScreenProps) => {
  
  const login = () => props.navigation.navigate("Login")

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.login_div}>
        <View style={styles.img_div}>
          <Image
            source={require('./img/buurtboer_logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.password_forgot_div}>
            <Text style={styles.password_forgot}>Wachtwoord vergeten </Text>
        </View>
        <TextInput
          placeholder="Nieuw wachtwoord"
          style={styles.input}
          // Handle username input
        />
        <TextInput
          placeholder="Herhaal wachtwoord"
          style={styles.input}
          // Handle username input
        />
        
       
        <TouchableOpacity style={styles.buttons} onPress={login}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 25,
      backgroundColor: '#D9D9D9',
    },
    login_div: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
      shadowColor: 'black',
      shadowRadius: 10,
    },
    img_div: {
      alignItems: 'center',
      backgroundColor: '#099F91',
      paddingHorizontal: 20,
      paddingVertical: 25,
      marginHorizontal: 20,
      marginVertical: 5,
    },
    password_forgot_div:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    password_forgot: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 25,
      marginHorizontal: 20,
      marginVertical: 5,
      color: 'black',
      fontSize: 20,
    },
    input: {
      height: 40,
      color: '#979797',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      marginBottom: 12,
      paddingLeft: 8,
      marginTop: 10,
      marginHorizontal: 5,
    },
    image: {
      backgroundColor: '#099F91',
    },
    buttons: {
      backgroundColor: '#F9834C',
      color: 'white',
      fontWeight: '600',
      padding: 10,
      borderRadius: 10,
      marginVertical: 55,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 20 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5, // For Android
    },
});

export default Change_Password;