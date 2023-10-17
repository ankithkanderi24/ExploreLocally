import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PersonCard from './PersonCard'; // Import the PersonCard component
import LoginScreen from './loginScreen'; // Import the LoginScreen

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
    <SafeAreaView style={styles.container}>
      {username ? (
        <ScrollView>
          {data.map((username, index) => (
            <PersonCard key={index} username={username} />
          ))}
        </ScrollView>
      ) : (
        <LoginScreen onLogin={setUsername} />
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