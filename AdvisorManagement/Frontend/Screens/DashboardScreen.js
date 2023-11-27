import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import AdvisorApplication from '../AdvisorApplication';

const DashboardScreen = ({ route }) => {
  
  const [data, setData] = useState([]);

  
  useEffect(() => {
      fetch('http://127.0.0.1:5000/advisors_application/getall')
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error(error));
    }
  );

  const handleApprove = (username) => {
    console.log("Approving:", username);
    
    fetch(`http://127.0.0.1:5000/advisors_application/approve/${username}`, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        console.log("Advisor approved successfully");
        // Optionally, refresh the list or remove the approved advisor from the UI
      } else {
        console.error("Error approving advisor");
      }
    })
    .catch((error) => console.error("Error:", error));
  };

  const handleDeny = (username) => {
    console.log("Denying:", username);
    
    fetch(`http://127.0.0.1:5000/advisors_application/deny/${username}`, { method: 'POST' })
    .then((response) => {
      if (response.ok) {
        console.log("Advisor denied successfully");
        // Optionally, refresh the list or remove the approved advisor from the UI
      } else {
        console.error("Error denying advisor");
      }
    })
    .catch((error) => console.error("Error:", error));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {data.map((advisor, index) => (
            <AdvisorApplication
              key={index}
              username={advisor.username}
              phone_number={advisor.phone_number}
              address = {advisor.address}
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
