import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserFinances = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Finances</Text>
      <Text style={styles.text}>Income: $5,000</Text>
      <Text style={styles.text}>Expenses: $2,000</Text>
      <Text style={styles.text}>Net Worth: $10,000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Light text for dark mode
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#bbbbbb', // Slightly dimmer light text
  },
});

export default UserFinances;
