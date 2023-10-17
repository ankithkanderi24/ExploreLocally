import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PersonCard from './PersonCard'; // Import the PersonCard component
import LoginScreen from './Screens/loginScreen'; // Import the LoginScreen
import RegistrationScreen from './Screens/registrationScreen';
import DashboardScreen from './Screens/DashboardScreen';
import WaitingScreen from './WaitingScreen';


const Stack = createStackNavigator();

const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);  // New state to track login
  useEffect(() => {
    if (username) {  // Only fetch data if logged in
      fetch('http://127.0.0.1:5000/advisor/getall')
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }
  }, [username]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={setUsername} />}
        </Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Dashboard">
          {props => <DashboardScreen {...props} data={data} />}
        </Stack.Screen>
        <Stack.Screen name = "WaitingScreen" component={WaitingScreen}/>
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