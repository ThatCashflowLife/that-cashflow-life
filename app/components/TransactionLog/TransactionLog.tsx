// import necessary libraries/methods and components
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { formatUSD } from "../../../utils/currencyUtil";
import { formatTimestamp } from "../../../utils/timeUtil";
import Transaction from "../../../interfaces/transaction";
import { testTransactions } from "../../../testData/testTransactions";
import User from "../../../interfaces/user";

// component properties type definition
interface TransactionLogProps {
  user: User;
}

const TransactionLog: React.FC<TransactionLogProps> = ({ user }) => {
  // Logic/Functions Section

  // determines the color based on the transaction type
  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "salary":
        return "#3e9c35"; // income green
      case "passive income":
        return "#3e9c35"; // income green
      case "expense":
        return "#ff4444"; // expense red
      case "asset":
        return "#4444ff"; // asset purple
      case "liability":
        return "#ff8c00"; // liability orange
      default:
        return "#4cb348"; // default green
    }
  };

  // Tsx for every transaction
  const renderTransaction = (transaction: Transaction) => (
    <View style={styles.card} key={transaction.id}>
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.timestamp}>
            {formatTimestamp(transaction.timestamp)}
          </Text>
          <View
            style={[
              styles.typeTag,
              { backgroundColor: getTypeColor(transaction.type) },
            ]}
          >
            <Text style={styles.typeText}>
              {transaction.type.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{transaction.description}</Text>

        <View style={styles.changesContainer}>
          <View style={styles.fieldChange}>
            <Text
              style={
                transaction.amount > 0
                  ? styles.positiveAmount
                  : styles.negativeAmount
              }
            >
              {formatUSD(transaction.amount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Overall tsx section
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {testTransactions.map(renderTransaction)}
      </ScrollView>
    </View>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // Full Log container
  container: {
    flex: 1,
  },
  // container that scrolls
  scrollContainer: {
    flex: 1,
  },
  // background container for each card
  card: {
    marginVertical: 5, // space between components
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 7,
    paddingVertical: 13,
    borderRadius: 10,
  },
  // card for each transaction
  transactionCard: {
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 10,
  },
  // header for each transaction
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  // timestamp for each transaction
  timestamp: {
    color: "#bbbbbb",
    fontSize: 14,
  },
  // type of transaction container
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  // type of transaction txt
  typeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  // transaction description
  description: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
  // container for field change
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#3a3a3a",
    paddingTop: 3,
  },
  // what field it affects
  fieldChange: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  // currency difference
  positiveAmount: {
    color: "#3e9c35",
    fontSize: 14,
    fontWeight: "500",
  },
  // negative currency difference
  negativeAmount: {
    color: "#ff4444",
    fontSize: 14,
    fontWeight: "500",
  },
});

// exported to be called in index.tsx by tab navigation
export default TransactionLog;
