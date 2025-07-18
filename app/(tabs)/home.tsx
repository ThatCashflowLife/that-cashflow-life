// import necessary libraries/methods and components
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,TouchableOpacity,
} from "react-native";
import Theme from "../../interfaces/theme";
import { useTransactions } from "../components/context/TransactionProvider";
import { useUser } from "../components/context/UserProvider";

import LatestTransaction from "../components/TransactionLog/LatestTransaction";
import FinancialOverview, { calculateNetWorth } from "../components/UserFinances/FinancialOverview";
import LoanDialog from "../components/features/LoanDialog";
import PaymentDialog from "../components/features/PaymentDialog";
import { LoanCategory,PassiveIncomeCategory } from "../components/QrCodeScanner/ScannerLogic";
import DealDialog from "../components/features/DealDialog";
import formatUSD from "../../utils/currencyUtil";



export const Home = () => {
  // state/ref management section
  const { user, setUser } = useUser();
  const { addTransactions } = useTransactions();
  const [isLoanDialogVisible, setIsLoanDialogVisible] = useState(false);
  const [isPaymentDialogVisible, setIsPaymentDialogVisible] = useState(false);
  const [isDealDialogVisible, setIsDealDialogVisible] = useState(false);



  

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading User...</Text>
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
       

        {/* Paycheck Summary */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Paycheck Summary</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Salary + Passive Income:</Text>
              <Text style={styles.value}>
                {formatUSD(user.totalIncome ?? 0)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Expenses:</Text>
              <Text style={styles.negative}>
                {formatUSD(user.totalExpenses ?? 0)}
              </Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Estimated Monthly Paycheck:</Text>
              <Text
                style={[
                  styles.value,
                  user.totalIncome ?? 0 <= 0 ? styles.positive : styles.negative,
                ]}
              >
                {formatUSD((user.totalIncome ?? 0) - (user.totalExpenses ?? 0))}
              </Text>
            </View>
          </View>
        </View>

        {/* Financial Overview */}
        <View style={styles.card}>
          <FinancialOverview />
        </View>

        <View style={styles.card}>
          <LatestTransaction />
        </View>
      </View>
      




    </ScrollView>
    
  );
};

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  // card for each component
  card: {
    marginVertical: Theme.CFL_card_spacing, // space between components
    backgroundColor: Theme.CFL_card_background, // lighter card background
    borderRadius: 10,
  },
  // scrollable view
  scrollView: {
    flex: 1,
    backgroundColor: Theme.CFL_app_background,
  },
  // scrollable
  scrollContent: {
    paddingBottom: 100,
  },
  // all conntent
  content: {
    padding:0,
  },
  // loading indicator
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.CFL_app_background,
  },
  // loading text
  loadingText: {
    color: Theme.CFL_light_text,
    marginTop: 50,
  },
  section: {
    padding: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Theme.CFL_white,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  label: {
    fontSize: 16,
    color: Theme.CFL_light_text,
  },

  value: {
    fontSize: 16,
    color: Theme.CFL_white,
  },

  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#777",
    paddingTop: 10,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.CFL_white,
  },

  positive: {
    fontSize: 18,
    fontWeight: "bold",
    color: "lightgreen",
  },

  negative: {
    fontSize: 18,
    fontWeight: "bold",
    color: "tomato",
  },
  
  
});

export default Home;
