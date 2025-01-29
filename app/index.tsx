// import necessary libraries/methods and components
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import UserFinances from "./components/UserFinances";
import TransactionLogs from "./components/TransactionLogs";
import ScannerButton from "./components/QrCodeScanner/ScannerButton";

// App/index.tsx is the top level of the app, where all components reside (the home page)
// Sometimes this is called App.tsx, but expo looks for index.tsx
export default function App() {
  // logic/Functions Section
  const handleDataScan = () => {
    console.log("getting data from qr scan.");
  };
  // Tsx section (similar to html)
  return (
    // Safe Area avoids the phones header (battery, cell service)
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        {/*Header Component*/}
        <Header />

        {/*Qr Code Scanner Button/Components*/}
        <View style={[styles.appContent]}>
          <View style={styles.card}>
            <ScannerButton onDataScan={handleDataScan} />
          </View>

          {/*User's Finance's Component*/}
          <View style={styles.card}>
            <UserFinances />
          </View>

          {/*Transaction Logs Component*/}
          <View style={styles.card}>
            <TransactionLogs />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: "#121212",
  },
  appContent: {
    padding: 16,
  },
  card: {
    marginVertical: 8, // space between cards
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 7,
    borderRadius: 10,
  },
});
