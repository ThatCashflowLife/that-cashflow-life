// import necessary libraries/methods and components
import User from "@/interfaces/user";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import formatUSD from "@/utils/currencyUtil";

// component properties type definition
interface FinancialStatementProps {
  user: User;
  isVisible: boolean;
  onClose: () => void;
}

const FinancialStatement: React.FC<FinancialStatementProps> = ({
  user,
  isVisible,
  onClose,
}) => {
  // Logic/Functions Section
  

  // Tsx Section
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {user.name}'s Financial Statement
          </Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnTxt}>Close</Text>
          </TouchableOpacity>
        </View>
        {/* Statement Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Income Sources List */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Income Sources</Text>

              {/* Salary */}
              <View style={styles.row}>
                <Text style={styles.label}>Salary:</Text>
                <Text style={styles.value}>
                  {formatUSD(user.incomeExplained.Salary)}
                </Text>
              </View>
              {/* Separator Line */}
              <View style={styles.separator} />

              {/* Passive Income */}
              {Object.entries(user.incomeExplained["Passive Income"]).map(
                ([source, amount]) => (
                  <View key={source} style={styles.row}>
                    <Text style={styles.label}>{source}:</Text>
                    <Text style={styles.value}>{formatUSD(amount)}</Text>
                  </View>
                )
              )}

              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Passive Income:</Text>
                <Text style={styles.positive}>
                  {formatUSD(
                    Object.values(
                      user.incomeExplained["Passive Income"]
                    ).reduce((a, b) => a + b, 0)
                  )}
                </Text>
              </View>

              <View style={[styles.row]}>
                <Text style={styles.totalLabel}>Total Income:</Text>
                <Text style={styles.positive}>
                  {formatUSD(user.totalIncome)}
                </Text>
              </View>
            </View>

            {/* Expenses */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Monthly Expenses</Text>
              {Object.entries(user.expensesExplained).map(
                ([expense, amount]) => (
                  <View key={expense} style={styles.row}>
                    <Text style={styles.label}>{expense}:</Text>
                    <Text style={styles.value}>{formatUSD(amount)}</Text>
                  </View>
                )
              )}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Expenses:</Text>
                <Text style={styles.negative}>
                  {formatUSD(user.totalExpenses)}
                </Text>
              </View>
            </View>

            {/* Assets */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Assets</Text>
              {Object.entries(user.Assets).map(([asset, amount]) => (
                <View key={asset} style={styles.row}>
                  <Text style={styles.label}>{asset}:</Text>
                  <Text style={styles.value}>{formatUSD(amount)}</Text>
                </View>
              ))}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Assets:</Text>
                <Text style={styles.positive}>
                  {formatUSD(
                    Object.values(user.Assets).reduce((a, b) => a + b, 0)
                  )}
                </Text>
              </View>
            </View>

            {/* Liabilities */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Liabilities</Text>
              {Object.entries(user.Liabilities).map(([liability, amount]) => (
                <View key={liability} style={styles.row}>
                  <Text style={styles.label}>{liability}:</Text>
                  <Text style={styles.value}>{formatUSD(amount)}</Text>
                </View>
              ))}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Liabilities:</Text>
                <Text style={styles.negative}>
                  {formatUSD(
                    Object.values(user.Liabilities).reduce((a, b) => a + b, 0)
                  )}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // full statement container
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  // header
  header: {
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#1e1e1e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // title
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // scrollable view
  scrollView: {
    flex: 1,
  },
  // scrollable content
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  // statement content container
  content: {
    flex: 1,
    padding: 15,
  },
  // close btn
  closeBtn: {
    padding: 8,
    backgroundColor: "#333333",
    borderRadius: 8,
  },
  // close btn txt
  closeBtnTxt: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  // income/expenses/assets
  section: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  // section titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  // row
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  // total values
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  // labels
  label: {
    fontSize: 16,
    color: "#bbbbbb",
  },
  // values
  value: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  // labels for totals
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // if $ is positive
  positive: {
    color: "#3e9c35",
    fontSize: 16,
    fontWeight: "bold",
  },
  // if $ is negative
  negative: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "bold",
  },
  // dividing line
  separator: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 3,
  },
});

// export the component, to be called in index.tsx
export default FinancialStatement;
