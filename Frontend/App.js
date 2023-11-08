import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PersonCard from './PersonCard';
import LoginScreen from './Screens/loginScreen';
import RegistrationScreen from './Screens/registrationScreen';
import AdvisorWaitingScreen from './Screens/AdvisorWaitingScreen';
import AdvisorRegistrationInformationScreen from './Screens/AdvisorRegistrationInformationScreen';
import SearchAdvisorsScreen from './Screens/SearchAdvisorsScreen';
import DashboardScreen from './Screens/DashboardScreen';

const Stack = createStackNavigator();

const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    if (username) { 
      fetch('http://127.0.0.1:5000/advisors/getall')
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
        <Stack.Screen name = "Waiting" component={AdvisorWaitingScreen} />
        <Stack.Screen name = "AdvisorRegistration" component={AdvisorRegistrationInformationScreen} />
        <Stack.Screen name="SearchAdvisors" component={SearchAdvisorsScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
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