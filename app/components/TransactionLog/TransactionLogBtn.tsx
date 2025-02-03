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
      {/* Transaction Log Btn */}
      <TouchableOpacity
        style={styles.container}
        onPress={handleOpenTransactionLog}
      >
        <Text style={styles.title}> View Full Transaction Log</Text>
      </TouchableOpacity>

      {/* Transaction Log */}
      {logVisible && (
        <TransactionLog visible={logVisible} onClose={handleLogsClose} />
      )}
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // Button Container
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  // Button title
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

// exported to be called within Index.tsx
export default TransactionLogBtn;
