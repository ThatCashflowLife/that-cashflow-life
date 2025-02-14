// import necessary libraries/methods and components
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { RealEstate } from "../../../interfaces/assets";
import Theme from "../../../interfaces/theme";
import User from "../../../interfaces/user";
import testProperties from "../../../testData/testProperties";
import { formatUSD } from "../../../utils/currencyUtil";
import { formatTimestamp } from "../../../utils/timeUtil";

// component properties type definition
interface PropertiesProps {
  user: User;
}

const Properties: React.FC<PropertiesProps> = ({ user }) => {
  // Logic/Functions Section

  // determines the color based on the transaction type
  const getTypeColor = (type: RealEstate["type"]) => {
    switch (type) {
      case "house":
        return Theme.CFL_pink;
      case "business":
        return Theme.CFL_cyan;
      default:
        return Theme.CFL_lime_green; // default green
    }
  };

  // Tsx for every property
  const renderProperty = (property: RealEstate) => (
    <View key={property.name} style={styles.card}>
      <View style={styles.propertyCard}>
        <View style={styles.propertyHeader}>
          <Text style={styles.timestamp}>
            {formatTimestamp(property.purchaseTime)}
          </Text>
          <View
            style={[
              styles.typeTag,
              { backgroundColor: getTypeColor(property.type) },
            ]}
          >
            <Text style={styles.typeText}>{property.type.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.propertyName}>{property.name}</Text>
        <Text style={styles.description}>{property.description}</Text>

        <View style={styles.changesContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.fieldName}>Purchase Price:</Text>
            <Text style={styles.value}>
              {formatUSD(property["Purchase Price"])}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.fieldName}>Monthly Cash Flow:</Text>
            <Text
              style={
                property["Cash Flow"] > 0
                  ? styles.positiveAmount
                  : styles.negativeAmount
              }
            >
              {formatUSD(property["Cash Flow"])}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.fieldName}>Mortgage:</Text>
            <Text style={styles.value}>{formatUSD(property.Mortgage)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.fieldName}>Sale Range:</Text>
            <Text style={styles.value}>{`${formatUSD(
              Number(property["Sale Range"].split("-")[0])
            )} - ${formatUSD(
              Number(property["Sale Range"].split("-")[1])
            )}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Overall tsx section
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {testProperties.map(renderProperty)}
      </ScrollView>
    </View>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // component container
  container: {
    flex: 1,
  },
  // scrollable container
  scrollContainer: {
    flex: 1,
  },
  // each property card
  card: {
    marginVertical: Theme.CFL_card_spacing,
    backgroundColor: Theme.CFL_black,
    padding: 7,
    paddingVertical: 13,
    borderRadius: 10,
  },
  // inner property card
  propertyCard: {
    backgroundColor: Theme.CFL_card_background,
    padding: 10,
    borderRadius: 10,
  },
  // header section (each card)
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  // timestamp
  timestamp: {
    color: Theme.CFL_light_gray,
    fontSize: 14,
  },
  // property type tag
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    margin: 2,
  },
  // property type text
  typeText: {
    color: Theme.CFL_white,
    fontSize: 12,
    fontWeight: "bold",
  },
  // name of property
  propertyName: {
    color: Theme.CFL_white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  // property description
  description: {
    color: Theme.CFL_white,
    fontSize: 14,
    marginBottom: 8,
  },
  // container for values
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: Theme.CFL_gray,
    paddingTop: 8,
  },
  // each value row
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  // name of change
  fieldName: {
    color: Theme.CFL_light_gray,
    fontSize: 14,
  },
  // value of change (neutral)
  value: {
    color: Theme.CFL_white,
    fontSize: 14,
    fontWeight: "500",
  },
  // if its positive
  positiveAmount: {
    color: Theme.CFL_lime_green,
    fontSize: 14,
    fontWeight: "500",
  },
  // if its negative
  negativeAmount: {
    color: Theme.CFL_red,
    fontSize: 14,
    fontWeight: "500",
  },
});

// exported to be called in index.tsx by tab navigation
export default Properties;
