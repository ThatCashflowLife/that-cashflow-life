import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import linking from './../linking';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Header from "./components/Header";
import ScanUI from "./components/QrCodeScanner/ScanUI";
import UserFinances from "./components/UserFinances";
import TransactionLogs from "./components/TransactionLogs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [appTopPadding, setAppTopPadding] = useState(0);

  useEffect(() => {
    if (Platform.OS === "ios") {
      setStatusBarHeight(getStatusBarHeight() + 30);
      setAppTopPadding(5);
    } else if (Platform.OS === "android") {
      setStatusBarHeight(getStatusBarHeight());
      setAppTopPadding(10);
    } else {
      setStatusBarHeight(0);
      setAppTopPadding(55);
    }
  }, []);

  return (
    // <NavigationContainer linking={linking}>
      <SafeAreaProvider>
        <SafeAreaView
          style={[styles.container, { marginTop: statusBarHeight }]}
        >
          <Header />
          <View style={[styles.appContent, { paddingTop: appTopPadding }]}>
            <Card style={styles.card}>
              <ScanUI />
            </Card>
            <Card style={styles.card}>
              <UserFinances />
            </Card>
            <Card style={styles.card}>
              <TransactionLogs />
            </Card>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: "#121212",
  },
  appContent: {
    flex: 1, // app should take up space below header
    marginTop: 45, // push app content below the header
    padding: 16,
  },
  card: {
    marginVertical: 8, // space between cards
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 8,
    borderRadius: 10,
  },
});
