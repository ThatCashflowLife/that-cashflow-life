// import necessary libraries/methods and components
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TransactionLog from "./TransactionLog";

const TransactionLogBtn = () => {
  const [logVisible, setLogVisible] = useState(false);
  // Logic/Functions Section
  const handleOpenTransactionLog = () => {};
  const handleLogsClose = () => {};
  // Tsx Section
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleOpenTransactionLog}
      >
        <Text style={styles.title}> View Full Transaction Log</Text>
      </TouchableOpacity>

      <TransactionLog visible={logVisible} onClose={handleLogsClose} />
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
});

// exported to be called within Index.tsx
export default TransactionLogBtn;
