// import necessary libraries/methods and components
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TransactionLogs = () => {
// Logic/Functions Section

//this is all test/hard coded data 
const transactions = [
  { id: '1', description: 'Bought Real Estate -$10,000' },
  { id: '2', description: 'Received Salary +$5,000' },
];

// Tsx Section
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Logs</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.text}>{item.description}</Text>}
      />
    </View>
  );
};

// Styling Section
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#bbbbbb',
  },
});

// exported to be called within Index.tsx
export default TransactionLogs;
