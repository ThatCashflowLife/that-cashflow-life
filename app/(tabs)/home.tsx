// import necessary libraries/methods and components
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,TouchableOpacity,
} from "react-native";

import { QRData } from "../../interfaces/qrTypes";
import Theme from "../../interfaces/theme";
import { useTransactions } from "../components/context/TransactionProvider";
import { useUser } from "../components/context/UserProvider";
import ScannerButton from "../components/QrCodeScanner/ScannerButton";
import {
  createProfessionTransaction,
  populateFirstProfession,
  populateLaterProfession, addChildToUser, createBabyTransaction, addLoanToUser, createLoanTransaction
} from "../components/QrCodeScanner/ScannerLogic";
import LatestTransaction from "../components/TransactionLog/LatestTransaction";
import FinancialOverview, { calculateNetWorth } from "../components/UserFinances/FinancialOverview";
import LoanDialog from "../components/features/LoanDialog";


export const Home = () => {
  // state/ref management section
  const { user, setUser } = useUser();
  const { addTransactions } = useTransactions();
  const [isLoanDialogVisible, setIsLoanDialogVisible] = useState(false);



  // this will get the data from a qr scan
  const handleScan = (data: QRData) => {
    if (data.scanType === "Profession") {
      if (user.profession === "Profession" || user.profession === "") {
        setUser(populateFirstProfession(data, user));
        calculateNetWorth(user, setUser);
      } else {
        setUser(populateLaterProfession(data, user));
      }
      const newJobTransaction = createProfessionTransaction(data);
      addTransactions([newJobTransaction]);
    } else if (data.scanType === "Transaction") {
      if (data.name === "New Baby") {
        const updatedUser = addChildToUser(user);
        const babyTransaction = createBabyTransaction(user);
        setUser(updatedUser);
        addTransactions([babyTransaction]);
      } else if (data.name === "New Loan" && data.loanDetails) {
        const updatedUser = addLoanToUser(user, data.loanDetails);
        const loanTransaction = createLoanTransaction(data.loanDetails);
        setUser(updatedUser);
        addTransactions([loanTransaction]);
      }
    }
    
  };

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
        {/* Qr Scanner Button */}
        <View style={styles.card}>
          <ScannerButton onScan={handleScan} />
        </View>
        {/* Add Loan Button */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.loanButton}
            onPress={() => setIsLoanDialogVisible(true)}
          >
            <Text style={styles.loanButtonText}>Add Loan Manually</Text>
          </TouchableOpacity>
        </View>


        {/* Financial Overview */}
        <View style={styles.card}>
          <FinancialOverview />
        </View>

        <View style={styles.card}>
          <LatestTransaction />
        </View>
      </View>
      <LoanDialog
        isVisible={isLoanDialogVisible}
        onSubmit={(loanAmount: number, paymentAmount: number, purpose: string) => {
          const updatedUser = addLoanToUser(user, {
            amount: loanAmount,
            payment: paymentAmount,
            purpose: purpose,
          });

          const loanTransaction = createLoanTransaction({
            amount: loanAmount,
            payment: paymentAmount,
            purpose,
          });

          setUser(updatedUser);
          addTransactions([loanTransaction]);
          calculateNetWorth(updatedUser, setUser);
          setIsLoanDialogVisible(false);
          
        }}
              
        onCancel={() => setIsLoanDialogVisible(false)}
      />

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
  loanButton: {
    backgroundColor: Theme.CFL_green,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  loanButtonText: {
    color: Theme.CFL_white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Theme.CFL_primary_font,
  },
  
});

export default Home;
