import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '../App';

const SearchAdvisorsScreen = ({ navigation }) => {
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [openInterest, setOpenInterest] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState([]);

  const locations = [
    { label: 'New York', value: 'New York' },
    { label: 'Rome', value: 'Rome' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'Sydney', value: 'Sydney' },
    { label: 'Buenos Aires', value: 'Buenos Aires' }
  ];

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Italian', value: 'Italian' },
    { label: 'French', value: 'French' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Spanish', value: 'Spanish' }
  ];

  const interests = [
    { label: 'Budget', value: 'Budget' },
    { label: 'Outdoors', value: 'Outdoors' },
    { label: 'Nightlife', value: 'Nightlife' },
    { label: 'Family-Friendly', value: 'Family-Friendly' },
    { label: 'Scenic', value: 'Scenic' },
    { label: 'Foodie', value: 'Foodie' }
  ];



  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams({
        languages: selectedLanguage,
        location: selectedLocation,
        interests: selectedInterest.join(','),
      });

      const response = await fetch(`${API_URL}/advisors/query?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const advisors = await response.json();

      navigation.navigate('Dashboard', { advisors: advisors });
    } catch (error) {
      console.error('There was an error fetching the advisors:', error);
    }
  };

  const handleSeeAllAdvisors = async () => {
    try {
      const response = await fetch(`${API_URL}/advisors/getall`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allAdvisors = await response.json();

      navigation.navigate('Dashboard', { advisors: allAdvisors });
    } catch (error) {
      console.error('There was an error fetching the top advisors:', error);
    }
  };


  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.label}>Location:</Text>
      <DropDownPicker
        open={openLocation}
        value={selectedLocation}
        items={locations}
        setOpen={setOpenLocation}
        setValue={setSelectedLocation}
        zIndex={3000}
        zIndexInverse={1000}
        style={styles.picker}
      />
      <Text style={styles.label}>Language:</Text>
      <DropDownPicker
        open={openLanguage}
        value={selectedLanguage}
        items={languages}
        setOpen={setOpenLanguage}
        setValue={setSelectedLanguage}
        zIndex={2000}
        zIndexInverse={2000}
        style={styles.picker}
      />
      <Text style={styles.label}>Interest:</Text>
      <DropDownPicker
        open={openInterest}
        value={selectedInterest}
        items={interests}
        setOpen={setOpenInterest}
        setValue={setSelectedInterest}
        multiple={true}
        zIndex={1000}
        zIndexInverse={3000}
        style={styles.picker}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleSeeAllAdvisors}>
        <Text style={styles.buttonText}>See All Advisors</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  picker: {
    height: 40,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchAdvisorsScreen;