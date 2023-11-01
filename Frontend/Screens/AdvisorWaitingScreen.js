import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const AdvisorWaitingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Waiting for call...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
});

export default AdvisorWaitingScreen;