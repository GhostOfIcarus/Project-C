// LoginScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen = (props: LoginScreenProps) => {
  
  const login = () => props.navigation.navigate("Home")

  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        // Handle username input
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        // Handle password input
      />
      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default LoginScreen;
