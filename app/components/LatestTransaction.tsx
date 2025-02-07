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
  // Latest Transaction Card Container
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  // Latest Transaction Title
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

// exported to be called within Index.tsx
export default LatestTransaction;
