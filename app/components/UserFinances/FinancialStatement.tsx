// import necessary libraries/methods and components
import User from "../../../interfaces/user";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import formatUSD from "../../../utils/currencyUtil";
import addValuesTogether from "../../../utils/additionUtil";

// component properties type definition
interface FinancialStatementProps {
  user: User;
}

const FinancialStatement: React.FC<FinancialStatementProps> = ({ user }) => {
  // Logic/Functions Section

  // Tsx Section
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Statement Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Income Sources List */}
          <View style={styles.card}>
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
                    addValuesTogether(user.incomeExplained["Passive Income"])
                  )}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.totalLabel}>Total Income:</Text>
                <Text style={styles.positive}>
                  {formatUSD(user.totalIncome)}
                </Text>
              </View>
            </View>
          </View>

          {/* Expenses */}
          <View style={styles.card}>
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
          </View>

          {/* Assets */}
          <View style={styles.card}>
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
          </View>

          {/* Liabilities */}
          <View style={styles.card}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  // full statement container
  container: {
    backgroundColor: "#121212",
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
    padding: 5,
  },
  // background container for each section
  card: {
    marginVertical: 8, // space between components
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 7,
    paddingVertical: 17,
    borderRadius: 10,
  },
  // income/expenses/assets
  section: {
    backgroundColor: "#121212", // darker inner container
    padding: 15,
    borderRadius: 10,
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

// export to be called in index.tsx from tab navigation
export default FinancialStatement;
