import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, Alert } from 'react-native';

const RegistrationScreen = ({ onRegister, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdvisor, setIsAdvisor] = useState(false);  // State to keep track of toggle

  const handleRegistration = () => {
    const userType = isAdvisor ? 'advisors' : 'users';
    fetch(`http://127.0.0.1:5000/${userType}/register/${username}/${password}/${email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      const statusCode = response.status;
      return response.text().then(text => ({
        status: statusCode,
        text: text
      }));
    })
    .then(({ status, text }) => {
      console.log("Server Response:", text);
      if (status === 400) {
        onRegister(username);
        navigation.navigate('Login');
      } else if (status === 200 && isAdvisor) {
        // If the registration was successful and the user is an advisor, navigate to AdvisorRegistrationInformationScreen
        navigation.navigate('AdvisorRegistration', { username });
      } else {
        Alert.alert('Registration Failed:', text);
      }
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Email" // Added email input
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegistration} color="#3498db" />
      <View style={styles.toggleContainer}>
        <Text>User</Text>
        <Switch
          trackColor={{ false: "#ecf0f1", true: "#2ecc71" }}
          thumbColor={isAdvisor ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsAdvisor(previousState => !previousState)}
          value={isAdvisor}
        />
        <Text>Advisor</Text>
      </View>
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',  // Light gray background for contrast
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderRadius: 5,  // Rounded corners
    borderColor: '#3498db',  // Primary color for the border
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    elevation: 3,  // Shadow for Android
    shadowOffset: { width: 1, height: 1 },  // Shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});

export default RegistrationScreen;
