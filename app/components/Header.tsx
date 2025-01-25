import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Cashflow Life</Text>
      <Text style={styles.username}> Username </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 20,
    width: '100%',
    backgroundColor: '#3e9c35',
    padding: 20,
    alignItems: 'center',
    zIndex: 1000,
    elevation: 4, // shadow for Android
    shadowColor: '#ffffff', // shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22311d',
  },
  username: {
    fontSize: 16,
    color: '#22311d',
  },
});

export default Header;
