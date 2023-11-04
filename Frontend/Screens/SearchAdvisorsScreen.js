import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const SearchAdvisorsScreen = ({ navigation }) => {
  const [openLocation, setOpenLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [openInterest, setOpenInterest] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState([]);

  const locations = [
    { label: 'New York', value: 'new_york' },
    { label: 'Rome', value: 'rome' },
    { label: 'Paris', value: 'paris' },
    { label: 'Tokyo', value: 'tokyo' },
    { label: 'Sydney', value: 'sydney' },
    { label: 'Buenos Aires', value: 'buenos_aires' }
  ];
  
  const languages = [
    { label: 'English', value: 'english' },
    { label: 'Italian', value: 'italian' },
    { label: 'French', value: 'french' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Spanish', value: 'spanish' }
  ];
  
  const interests = [
    { label: 'Budget', value: 'budget' },
    { label: 'Outdoors', value: 'outdoors' },
    { label: 'Nightlife', value: 'nightlife' },
    { label: 'Family-Friendly', value: 'family_friendly' },
    { label: 'Scenic', value: 'scenic' },
    { label: 'Foodie', value: 'foodie' }
  ];
  

  const handleSearch = () => {
    // Perform search functionality here
  };

  const handleSeeAllAdvisors = () => {
    // Implement your navigation logic here
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
    paddingTop: 20, // Top padding
    paddingHorizontal: 20,
    paddingRight: 20, // Right padding
    alignItems: 'stretch', // Aligns Picker components and maintains consistent margins
    justifyContent: 'center', // Centers content in the screen vertically (optional)
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000', // Ensuring good readability
  },
  picker: {
    height: 40,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0066CC', // A color that stands out
    padding: 15,
    borderRadius: 5,
    alignItems: 'center', // Centering button text
    marginTop: 10, // Added margin top for spacing from the last Picker
  },
  buttonSecondary: {
    backgroundColor: '#000', // A color that stands out
    padding: 15,
    borderRadius: 5,
    alignItems: 'center', // Centering button text
    marginTop: 10, // Added margin top for spacing from the last Picker
  },
  buttonText: {
    color: '#fff', // White color for button text to stand out
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchAdvisorsScreen;
