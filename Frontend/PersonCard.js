import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Linking } from 'react-native';


const PersonCard = ({username, location, interests, languages }) => {

  const renderArrayAsString = (array) => {
    return Array.isArray(array) && array.length ? array.join(', ') : 'None';
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{username}</Text>
      <Text>Location: {location}</Text>
      <Text>Languages: {renderArrayAsString(languages)}</Text>
      <Text>Interests: {renderArrayAsString(interests)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
});


export default PersonCard;