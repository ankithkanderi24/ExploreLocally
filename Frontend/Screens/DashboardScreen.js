import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import PersonCard from '../PersonCard';

const DashboardScreen = () => {
  // State to hold the fetched data
  const [data, setData] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/advisor/getall')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {/* ScrollView for PersonCards */}
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {data.map((username, index) => (
            <PersonCard key={index} username={username} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 3,
  },
});

export default DashboardScreen;
