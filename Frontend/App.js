import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PersonCard from './PersonCard'; // Import the PersonCard component
import LoginScreen from './Screens/loginScreen'; // Import the LoginScreen
import RegistrationScreen from './Screens/registrationScreen';

const Stack = createStackNavigator();

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/advisor/getall')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error(error));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={setUsername} />}
        </Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Dashboard">
          {props => (
            <SafeAreaView style={styles.container}>
              {data.map((username, index) => (
                <PersonCard key={index} username={username} />
              ))}
            </SafeAreaView>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;