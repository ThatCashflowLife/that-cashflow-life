// import necessary libraries/methods and components
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Theme from "../../../interfaces/theme";
import addValuesTogether from "../../../utils/additionUtil";
import formatUSD from "../../../utils/currencyUtil";
import { useUser } from "../context/UserProvider";
import { calculateTotals } from "./FinancialOverview";
import calculateTotalAssets from "../../../utils/calculateTotalAssets";

const FinancialStatement = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    calculateTotals(user, setUser);
  }, [user.income, user.expenses]);

  const renderStockDetails = () => {
    const stocks = user.Assets?.Investments?.Stocks;
    if (!stocks || !stocks.holdings) return null;

    return (
      <>
        <View style={styles.row}>
          <Text style={styles.label}>Stocks Total Value:</Text>
          <Text style={styles.value}>{formatUSD(stocks.totalValue)}</Text>
        </View>

        {Object.entries(stocks.holdings).map(([symbol, info]) => {
          const shares = info.shares ?? 0;
          const price = info.averagePrice ?? 0;
          const value = shares * price;
          return (
            <View key={symbol} style={styles.row}>
              <Text style={styles.label}>
                {symbol} ({shares} @ {formatUSD(price)}):
              </Text>
              <Text style={styles.value}>{formatUSD(value)}</Text>
            </View>
          );
        })}
      </>
    );
  };
  

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Income Sources List */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income Sources</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Salary:</Text>
              <Text style={styles.value}>{formatUSD(user.income.Salary)}</Text>
            </View>
            <View style={styles.separator} />
            {user.income &&
              Object.entries(user.income["Passive Income"]).map(
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
                {formatUSD(addValuesTogether(user.income["Passive Income"]))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Income:</Text>
              <Text style={styles.positive}>{formatUSD(user.totalIncome ?? 0)}</Text>
            </View>
          </View>
        </View>

        {/* Expenses */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Expenses</Text>
            {Object.entries(user.expenses)
              .filter(([key]) => key !== "Per Child Expense")
              .map(([key, value]) => (
                <View key={key} style={styles.row}>
                  <Text style={styles.label}>{key}:</Text>
                  <Text style={styles.value}>{formatUSD(value)}</Text>
                </View>
              ))}
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Expenses:</Text>
              <Text style={styles.negative}>{formatUSD(user.totalExpenses ?? 0)}</Text>
            </View>
          </View>
        </View>

        {/* Assets Section */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assets</Text>

            {/* Savings */}
            <View style={styles.row}>
              <Text style={styles.label}>Savings:</Text>
              <Text style={styles.value}>{formatUSD(user.Assets.Savings)}</Text>
            </View>

            {/* Investments */}
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>Investments</Text>

            {/* Stocks */}
            {user.Assets?.Investments?.Stocks && (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>Stocks Total Value:</Text>
                  <Text style={styles.value}>
                    {formatUSD(user.Assets.Investments.Stocks.totalValue)}
                  </Text>
                </View>

                {Object.entries(user.Assets.Investments.Stocks.holdings).map(
                  ([symbol, info]) => {
                    const shares = info.shares ?? 0;
                    const price = info.averagePrice ?? 0;
                    const value = shares * price;
                    return (
                      <View key={symbol} style={styles.row}>
                        <Text style={styles.label}>
                          {symbol} ({shares} @ {formatUSD(price)}):
                        </Text>
                        <Text style={styles.value}>{formatUSD(value)}</Text>
                      </View>
                    );
                  }
                )}
              </>
            )}

            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Assets:</Text>
              <Text style={styles.positive}>{formatUSD(calculateTotalAssets(user))}</Text>

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
              <Text style={styles.negative}>{formatUSD(user.totalLiabilites ?? 0)}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Theme.CFL_app_background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    padding: 0,
  },
  card: {
    marginVertical: Theme.CFL_card_spacing,
    backgroundColor: Theme.CFL_card_background,
    padding: 7,
    paddingVertical: 5,
    borderRadius: 10,
  },
  section: {
    backgroundColor: Theme.CFL_transparent,
    padding: 5,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.CFL_white,
    fontFamily: Theme.CFL_title_font,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Theme.CFL_gray,
  },
  label: {
    fontSize: 16,
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
  },
  value: {
    fontSize: 16,
    color: Theme.CFL_white,
    fontWeight: "500",
    fontFamily: Theme.CFL_primary_font,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.CFL_white,
    fontFamily: Theme.CFL_primary_font,
  },
  positive: {
    color: Theme.CFL_lime_green,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 16,
    fontWeight: "bold",
  },
  negative: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: Theme.CFL_gray,
    marginVertical: 3,
  },
});

export default FinancialStatement;
