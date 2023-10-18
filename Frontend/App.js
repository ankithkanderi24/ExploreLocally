import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PersonCard from './PersonCard'; // Import the PersonCard component
import LoginScreen from './Screens/loginScreen'; // Import the LoginScreen
import RegistrationScreen from './Screens/registrationScreen';

const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState(null);  // New state to track login
  const [isOnLoginScreen, setIsOnLoginScreen] = useState(true); // Use state to track screen, need to update later
  
  useEffect(() => {
    if (username) {  // Only fetch data if logged in
      fetch('http://127.0.0.1:5000/advisor/getall')
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }
  }, [username]);

  const handleGoToRegister = () => {
    setIsOnLoginScreen(false);
  };
  
  const handleBackToLogin = () => {
    setIsOnLoginScreen(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {username ? (
        <ScrollView>
          {data.map((username, index) => (
            <PersonCard key={index} username={username} />
          ))}
        </ScrollView>
      ) : isOnLoginScreen ? (
        <LoginScreen onLogin={setUsername} onGoToRegister={handleGoToRegister} />
      ) : (
      <RegistrationScreen onRegister={handleBackToLogin} onGoBack={handleBackToLogin} />
    )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;