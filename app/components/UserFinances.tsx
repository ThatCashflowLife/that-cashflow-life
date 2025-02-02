// import necessary libraries/methods and components
import User from "@/interfaces/user";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import formatUSD from "@/utils/currencyUtil";
import { AntDesign } from "@expo/vector-icons";

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

  // Tsx Section
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}'s Financial Overview</Text>

      {/* Profession Icon */}
      <View style={styles.professionContainer}>
        <View style={styles.professionIconContainer}>
          <AntDesign name="questioncircle" size={35} color="#000000" />
        </View>
        <Text style={styles.professionTxt}>Profession</Text>
        {/* TODO: Use below once we pass user data */}
        {/* <Text style={styles.professionTxt}>{user.profession}</Text> */}
      </View>

      <View style={styles.separator} />

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
  // Financial Overview Card
  container: {
    padding: 15,
    backgroundColor: "#121212",
    borderRadius: 10,
    marginVertical: 10,
  },
  // title
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  // profession container
  professionContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    flexDirection: "row",
    color: "#bbbbbb",
  },
  // profession icon container
  professionIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#bbbbbb",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  // profession txt
  professionTxt: {
    fontSize: 15,
    color: "#bbbbbb",
    paddingLeft: 15,
  },
  // each row of txt
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  // txt field name
  label: {
    fontSize: 16,
    color: "#bbbbbb",
  },
  // txt value
  value: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  // if $ is positive
  positive: {
    color: "#3e9c35",
  },
  // if $ is negative
  negative: {
    color: "#ff4444",
  },
  // dividing line
  separator: {
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 10,
  },
});

// export the component, to be called in index.tsx
export default UserFinances;
