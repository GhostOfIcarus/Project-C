// RegisterScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegisterScreen = () => {
  const handleRegister = () => {
    // Perform registration logic here
    // For simplicity, let's just show an alert message
    Alert.alert('Registration Successful', 'Welcome!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your details"
        style={styles.input}
        // Handle input for registration details
      />
      <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
