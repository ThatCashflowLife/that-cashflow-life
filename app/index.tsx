// import necessary libraries/methods and components
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import Header from "./components/Header";
import UserFinances from "./components/UserFinances";
import TransactionLogs from "./components/TransactionLogs";
import ScannerButton from "./components/QrCodeScanner/ScannerButton";

// App/index.tsx is the top level of the app, where all components reside (the home page)
// Sometimes this is called App.tsx, but expo looks for index.tsx
export default function App() {
  // logic/Functions Section

  // Tsx section (similar to html)
  return (
    // Safe Area avoids the phones header (battery, cell service)
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>

        {/*Header Component*/}
        <Header />

        {/*Qr Code Scanner Button/Components*/}
        <View style={[styles.appContent]}>
          <Card style={styles.card}>
            <ScannerButton />
          </Card>

          {/*User's Finance's Component*/}
          <Card style={styles.card}>
            <UserFinances />
          </Card>

          {/*Transaction Logs Component*/}
          <Card style={styles.card}>
            <TransactionLogs />
          </Card>
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
