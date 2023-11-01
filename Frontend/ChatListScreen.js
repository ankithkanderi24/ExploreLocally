import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const sampleChats = [
  {
    advisorName: 'John',
    lastMessageTime: '2:30 PM',
    lastMessage: 'Sure, I can help you with that.',
  },
  {
    advisorName: 'Emily',
    lastMessageTime: 'Yesterday',
    lastMessage: 'See you then!',
  },
  // Add more sample chat data here...
];

const ChatListScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.chatItem}>
        <Text style={styles.advisorName}>{item.advisorName}</Text>
        <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
        <Text numberOfLines={1} style={styles.lastMessage}>
          {item.lastMessage}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleChats}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  advisorName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 16,
    color: '#333',
  },
});

export default ChatListScreen;
