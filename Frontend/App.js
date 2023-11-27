import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/loginScreen'; // Import the LoginScreen
import RegistrationScreen from './Screens/registrationScreen';
import AdvisorWaitingScreen from './Screens/AdvisorWaitingScreen';
import AdvisorRegistrationInformationScreen from './Screens/AdvisorRegistrationInformationScreen';
import DashboardScreen from './Screens/DashboardScreen';
import RatingScreen from './Screens/RatingScreen';
import SearchAdvisorsScreen from './Screens/SearchAdvisorsScreen';
export const API_URL = 'http://127.0.0.1:5000';
const Stack = createStackNavigator();


const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (username) {  // Only fetch data if logged in
      fetch(`${API_URL}/advisors/getall`)
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
        <Stack.Screen name="Waiting" component={AdvisorWaitingScreen} />
        <Stack.Screen name="AdvisorRegistration" component={AdvisorRegistrationInformationScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="RateAdvisor" component={RatingScreen} />
        <Stack.Screen name="SearchAdvisors" component={SearchAdvisorsScreen} />
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