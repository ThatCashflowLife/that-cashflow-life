// import necessary libraries/methods and components
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { testTransactions } from "../../data/testData/testTransactions";
import Theme from "../../interfaces/theme";
import Transaction from "../../interfaces/transaction";
import { findLatestTransaction } from "../../utils/transactionUtil";
import ScannerButton from "../components/QrCodeScanner/ScannerButton";
import LatestTransaction from "../components/TransactionLog/LatestTransaction";
import FinancialOverview from "../components/UserFinances/FinancialOverview";
import { useUser } from "./_layout";

export const Home = () => {
  // state/ref management section
  const user = useUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latestTransaction, setLatestTransaction] =
    useState<Transaction | null>(() => findLatestTransaction(testTransactions));
  // logic/Functions Section

  // this will get the data from a qr scan
  const handleScan = () => {
    console.log("getting data from qr scan.");
    const currTime = new Date().toISOString().slice(0, 16);
    console.log("time of scan: ", currTime);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  return (
    // Home Tab
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Qr Scanner Button */}
        <View style={styles.card}>
          <ScannerButton onScan={handleScan} />
        </View>

        {/* Financial Overview */}
        <View style={styles.card}>
          <FinancialOverview />
        </View>

        {/* Latest Transaction */}
        {latestTransaction && (
          <View style={styles.card}>
            <LatestTransaction transaction={latestTransaction} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  // card for each component
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_black, // lighter card background
    padding: 6,
    borderRadius: 10,
  },
  // scrollable view
  scrollView: {
    flex: 1,
    backgroundColor: Theme.CFL_app_background,
  },
  // scrollable
  scrollContent: {
    paddingBottom: 20,
  },
  // all conntent
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.CFL_app_background,
  },
  loadingText: {
    color: Theme.CFL_light_text,
    marginTop: 50,
  },
});

export default Home;
