import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, CheckBox, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';

const AdvisorRegistrationInformationScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [selectedLocation, setSelectedLocation] = useState('New York');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const locations = ['New York', 'Rome', 'Paris', 'Tokyo', 'Sydney', 'Buenos Aires'];
  const languages = ['English', 'Italian', 'French', 'Japanese', 'Spanish'];
  const interests = ['Budget', 'Outdoors', 'Nightlife', 'Family-Friendly', 'Scenic', 'Foodie'];

  const handleLanguageToggle = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRegistrationInformation = () => {
    // Prepare data to send to the API
    const data = {
      languages: selectedLanguages,
      interests: selectedInterests,
      location: selectedLocation,
    };
  
    // Make the API call
    fetch(`http://127.0.0.1:5000/advisors/registerinformation/${username}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        const statusCode = response.status;
        return response.text().then(text => ({
          status: statusCode,
          text: text,
        }));
      })
      .then(({ status, text }) => {
        if (status === 200) {
          // Successful registration
          Alert.alert(
            'Registration Successful',
            'You have been registered as an advisor in our system.',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'), // Navigate back to the login screen
              },
            ]
          );
        } else {
          // Handle registration failure
          Alert.alert('Registration Failed', text);
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'An error occurred during registration.');
      });
  };

  return (
    <View style={styles.centeredContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Select Destination You Plan to Advise On:</Text>
        <Picker
          selectedValue={selectedLocation}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        >
          {locations.map((location) => (
            <Picker.Item key={location} label={location} value={location} />
          ))}
        </Picker>

        <Text style={styles.label}>Select Proficient Languages:</Text>
        {languages.map((language) => (
          <View key={language} style={styles.checkboxContainer}>
            <CheckBox
              value={selectedLanguages.includes(language)}
              onValueChange={() => handleLanguageToggle(language)}
            />
            <Text style={styles.checkboxLabel}>{language}</Text>
          </View>
        ))}

        <Text style={styles.label}>Select Your Specific Areas of Knowledge:</Text>
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={styles.checkboxContainer}
            onPress={() => handleInterestToggle(interest)}
          >
            <CheckBox
              value={selectedInterests.includes(interest)}
              onValueChange={() => handleInterestToggle(interest)}
            />
            <Text style={styles.checkboxLabel}>{interest}</Text>
          </TouchableOpacity>
        ))}

        <Button title="Submit" onPress={handleRegistrationInformation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%', // Adjust the width as needed
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AdvisorRegistrationInformationScreen;
