import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, Alert } from 'react-native';



const LoginScreen = ({ onLogin, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdvisor, setIsAdvisor] = useState(false);  // State to keep track of toggle

  const handleLogin = () => {
    const userType = isAdvisor ? 'advisors' : 'users';  // Determine user type based on toggle state
    fetch(`http://127.0.0.1:5000/${userType}/verify/${username}/${password}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
      const statusCode = response.status;  // Capture the status code
      // Get the response text regardless of the status code
      return response.text().then(text => ({
        status: statusCode,
        text: text
      }));
    })
    .then(({ status, text }) => {
      console.log("Server Response:", text);  // Log the raw response
      if (status === 200) {
        onLogin(username);
        if (isAdvisor) {
          navigation.navigate('Waiting')
        } else { // Log the user in if status is 200
        navigation.navigate('SearchAdvisors');
        }
      } else {
        Alert.alert('Login Failed:', text);
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
      <Button title="Login" onPress={handleLogin} color="#3498db" />
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
      <Button title="Register an Account" onPress={() => navigation.navigate('Registration')} color="#e74c3c" />
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
    paddingLeft: 10
  }
});

export default LoginScreen;
