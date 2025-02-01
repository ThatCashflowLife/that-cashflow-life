// import necessary libraries/methods and components
import User from "@/interfaces/user";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// component properties type definition
interface UserFinancesProps {
  user: User;
}

const UserFinances: React.FC<UserFinancesProps> = ({ user }) => {
  // Logic/Functions Section
  const [finances, setFinances] = useState({});

  // Calculate net worth (Assets - Liabilities)
  const calculateNetWorth = () => {
    const totalAssets = Object.values(user.Assets).reduce(
      (sum, value) => sum + value,
      0
    );
    const totalLiabilities = Object.values(user.Liabilities).reduce(
      (sum, value) => sum + value,
      0
    );
    return totalAssets - totalLiabilities;
  };

  // Format number as USD
  const formatUSD = (amount: number) => {
    if (typeof amount === "number" && amount > 0) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } else {
      return "$0.00";
    }
  };
  // Tsx Section
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}'s Finances</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Monthly Income:</Text>
        <Text style={styles.value}>{formatUSD(user.totalIncome)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Monthly Expenses:</Text>
        <Text style={styles.value}>{formatUSD(user.totalExpenses)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Monthly Cashflow:</Text>
        <Text
          style={[
            styles.value,
            user.totalIncome - user.totalExpenses > 0
              ? styles.positive
              : styles.negative,
          ]}
        >
          {formatUSD(user.totalIncome - user.totalExpenses)}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <Text style={styles.label}>Total Assets:</Text>
        <Text style={styles.value}>
          {formatUSD(
            Object.values(user.Assets).reduce((sum, value) => sum + value, 0)
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Liabilities:</Text>
        <Text style={styles.value}>
          {formatUSD(
            Object.values(user.Liabilities).reduce(
              (sum, value) => sum + value,
              0
            )
          )}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Net Worth:</Text>
        <Text
          style={[
            styles.value,
            calculateNetWorth() > 0 ? styles.positive : styles.negative,
          ]}
        >
          {formatUSD(calculateNetWorth())}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#121212",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#bbbbbb",
  },
  value: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  positive: {
    color: "#3e9c35",
  },
  negative: {
    color: "#ff4444",
  },
  separator: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 10,
  },
});

// export the component, to be called in index.tsx
export default UserFinances;
