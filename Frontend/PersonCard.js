import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const PersonCard = ({ username }) => {
  const handleCallButtonPress = () => {
    Alert.alert(`Calling ${username}...`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{username}</Text>
      <Button title="Call" onPress={handleCallButtonPress} />
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