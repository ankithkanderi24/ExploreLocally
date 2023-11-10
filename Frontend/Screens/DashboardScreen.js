import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import PersonCard from '../PersonCard';

const DashboardScreen = ({ route }) => {
  
  const [data, setData] = useState([]);

  
  useEffect(() => {
    if (route.params?.advisors) {
      
      setData(route.params.advisors);
    } else {
      
      fetch('http://127.0.0.1:5000/advisors/getall')
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }
  }, [route.params?.advisors]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {data.map((advisor, index) => (
            <PersonCard
              key={index}
              username={advisor.username}
              location={advisor.location}
              interests={advisor.interests}
              languages={advisor.languages}
            />
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
