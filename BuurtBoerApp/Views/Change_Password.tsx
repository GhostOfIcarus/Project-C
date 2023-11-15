// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView   } from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const Change_Password = (props: LoginScreenProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = () => props.navigation.navigate("Login");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.login_div}>
          <View style={styles.img_div}>
            <Image
              source={require('./img/buurtboer_logo.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.change_password_div}>
              <Text style={styles.change_password}>Wachtwoord vergeten </Text>
          </View>
          <TextInput
            placeholder="Nieuw wachtwoord"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
          />
          <TextInput
            placeholder="Herhaal wachtwoord"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={{ color: '#099F91', textAlign: 'center', marginTop: 10 }}>
              {showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={login}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Verstuur</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    change_password_div:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    change_password: {
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
      marginVertical: 15,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 20 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5, // For Android
    },
});

export default Change_Password;