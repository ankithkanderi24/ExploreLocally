import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Linking } from 'react-native';


const PersonCard = ({username, phone, cities, interests, languages }) => {
  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{username}</Text>
      <Text>Cities: {cities}</Text>
      <Text>Languages: {languages.join(', ')}</Text>
      <Text>Interests: {interests.join(', ')}</Text>
      <Button title="Call" onPress={() => makeCall(phone)} />
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