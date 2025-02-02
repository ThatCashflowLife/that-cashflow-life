// import necessary libraries/methods and components
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import ScannerButton from "./components/QrCodeScanner/ScannerButton";
import UserFinances from "./components/UserFinances";
import blankUser from "@/testData/blankUser";
import User from "@/interfaces/user";
import TransactionLogBtn from "./components/TransactionLog/TransactionLogBtn";
import LatestTransaction from "./components/LatestTransaction";

// App/index.tsx is the top level of the app, where all components reside (the home page)
// Sometimes this is called App.tsx, but expo looks for index.tsx
export default function App() {
  const [user, setUser] = useState<User>(blankUser);
  // logic/Functions Section

  // load the username when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // saves the username in local/async storage
  const handleUpdateUsername = async (newName: string) => {
    try {
      const updatedUser = {
        ...user,
        name: newName,
      };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error saving username:", error);
    }
  };

  // this will get the data from a qr scan
  const handleScan = () => {
    console.log("getting data from qr scan.");
  };
  // Tsx section (similar to html)
  return (
    // Safe Area avoids the phones header (battery, cell service)
    <SafeAreaView style={[styles.container]}>
      {/*Header Component*/}
      <Header
        username={user.name}
        updateUsername={handleUpdateUsername}
        user={user}
      />

      {/*Qr Code Scanner Button/Components*/}
      <View style={[styles.appContent]}>
        <View style={styles.card}>
          <ScannerButton onScan={handleScan} />
        </View>

        {/*User's Finance's Component*/}
        <View style={styles.card}>
          <UserFinances user={user} />
        </View>
        {/* Latest Transaction Component */}
        <View style={styles.card}>
          <LatestTransaction />
        </View>

        {/*Transaction Logs Btn/ Full List*/}
        <View style={styles.card}>
          <TransactionLogBtn />
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
