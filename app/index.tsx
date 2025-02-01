// import necessary libraries/methods and components
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import UserFinances from "./components/UserFinances";
import TransactionLogs from "./components/TransactionLogs";
import ScannerButton from "./components/QrCodeScanner/ScannerButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

// App/index.tsx is the top level of the app, where all components reside (the home page)
// Sometimes this is called App.tsx, but expo looks for index.tsx
export default function App() {
  const [username, setUsername] = useState("change username");
  // logic/Functions Section

  // load the username when the component mounts
  useEffect(() => {
    const loadUsername = async () => {
      try {
        const savedName = await AsyncStorage.getItem("username");
        if (savedName) {
          setUsername(savedName);
        }
      } catch (error) {
        console.error("Error loading username:", error);
      }
    };
    loadUsername();
  }, []);

  // saves the username in local/async storage
  const handleUpdateUsername = async (newName: string) => {
    try {
      await AsyncStorage.setItem("username", newName);
      setUsername(newName);
    } catch (error) {
      console.error("Error saving username:", error);
    }
  };

  // this will get the data from a qr scan
  const handleDataScan = () => {
    console.log("getting data from qr scan.");
  };
  // Tsx section (similar to html)
  return (
    // Safe Area avoids the phones header (battery, cell service)
    <SafeAreaView style={[styles.container]}>
      {/*Header Component*/}
      <Header username={username} updateUsername={handleUpdateUsername} />

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
  );
}

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: "#121212", // Can test changes with this line
  },
  appContent: {
    padding: 16,
  },
  card: {
    marginVertical: 8, // space between components
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 7,
    borderRadius: 10,
  },
});
