// import necessary libraries/methods and components
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const TransactionLogs = () => {
  // Logic/Functions Section

  // Tsx Section
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}> View Full Transaction Log</Text>
    </TouchableOpacity>
  );
};

// Styling Section
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
});

// exported to be called within Index.tsx
export default TransactionLogs;
