import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import AdvisorApplication from '../AdvisorApplication';

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

  const handleApprove = (username) => {
    console.log("Approved:", username);
    // Implement the logic to approve the application
  };

  const handleDeny = (username) => {
    console.log("Denied:", username);
    // Implement the logic to deny the application
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {data.map((advisor, index) => (
            <AdvisorApplication
              key={index}
              username={advisor.username}
              location={advisor.location}
              interests={advisor.interests}
              languages={advisor.languages}
              onApprove={handleApprove}
              onDeny={handleDeny}
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
