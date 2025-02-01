// import necessary libraries/methods and components
import React from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { formatUSD } from "@/utils/currencyUtil";
import { formatTimestamp } from "@/utils/timeUtil";
import Transaction from "@/interfaces/transaction";
import { testTransactions } from "@/testData/testTransactions";

interface TransactionLogProps {
  visible: boolean;
  onClose: () => void;
}

const TransactionLog: React.FC<TransactionLogProps> = ({
  visible,
  onClose,
}) => {
  // Logic/Functions Section

  // determines the color based on the transaction type
  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "income":
        return "#3e9c35";
      case "expense":
        return "#ff4444";
      case "asset":
        return "#4444ff";
      case "liability":
        return "#ff8c00";
      default:
        return "#ffffff";
    }
  };

  // Tsx for every transaction
  const renderTransaction = (transaction: Transaction) => (
    <View key={transaction.id} style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.date}>
          {formatTimestamp(transaction.timestamp)}
        </Text>
        <View
          style={[
            styles.typeTag,
            { backgroundColor: getTypeColor(transaction.type) },
          ]}
        >
          <Text style={styles.typeText}>{transaction.type.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.description}>{transaction.description}</Text>

      <View style={styles.changesContainer}>
        <View style={styles.fieldChange}>
          <Text style={styles.fieldName}>{transaction.fieldName}</Text>
          <Text style={styles.amount}>{formatUSD(transaction.amount)}</Text>
        </View>
      </View>
    </View>
  );

  // Overall tsx section
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="none">
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        <ScrollView style={styles.scrollContainer}>
          {testTransactions.map(renderTransaction)}
        </ScrollView>
      </View>
    </Modal>
  );
};

// Styling Section
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  transactionCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 10,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    color: "#bbbbbb",
    fontSize: 14,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  description: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#3a3a3a",
    paddingTop: 8,
  },
  fieldChange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  fieldName: {
    color: "#bbbbbb",
    fontSize: 14,
  },
  amount: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default TransactionLog;
