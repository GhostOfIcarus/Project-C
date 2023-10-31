// LoginScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView   } from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {
  
  const Schedule = () => props.navigation.navigate("Schedule")

  const ForgotPassword = () => props.navigation.navigate("ForgotPassword")

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.login_div}>
        <View style={styles.img_div}>
          <Image
            source={require('./img/buurtboer_logo.png')}
            style={styles.image}
          />
        </View>

        <TextInput
          placeholder="E-mail"
          style={styles.input}
          // Handle username input
        />
        <TextInput
          placeholder="Wachtwoord"
          style={styles.input}
          secureTextEntry
          // Handle password input
        />
        <TouchableOpacity onPress={ForgotPassword}>
          <Text style={{ color: '#099F91', marginVertical: 10, marginHorizontal: 5 }}>Wachtwoord vergeten?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={Schedule}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
        <View style={styles.centered_text}>
          <Text style={{ color: 'black' }}>OF</Text>
        </View>

        <TouchableOpacity style={styles.buttons} onPress={Schedule}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login met Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={Schedule}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login met Microsoft</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#099F91',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginHorizontal: 20,
    marginVertical: 5,
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
  centered_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
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

export default LoginScreen;