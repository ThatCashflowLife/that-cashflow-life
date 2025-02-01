// import necessary libraries/methods and components
// import necessary libraries/methods and components
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LatestTransaction = () => {
  // Logic/Functions Section

  // Tsx Section
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> Latest Transaction Here</Text>
      </View>
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
export default LatestTransaction;
