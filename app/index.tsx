import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import Header from "./components/Header";
import ScanUI from "./components/QrCodeScanner/ScanUI";
import UserFinances from "./components/UserFinances";
import TransactionLogs from "./components/TransactionLogs";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <Header />
        <View style={[styles.appContent]}>
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
  );
}

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
