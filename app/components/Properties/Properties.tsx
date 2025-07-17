import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { RealEstate } from "../../../interfaces/Assets";
import Theme from "../../../interfaces/theme";
import { useUser } from "../context/UserProvider";
import { formatUSD } from "../../../utils/currencyUtil";
import { formatTimestamp } from "../../../utils/timeUtil";

const Properties = () => {
  const { user } = useUser();

  const getTypeColor = (type: RealEstate["type"]) => {
    switch (type) {
      case "3Br/2Ba House":
        return Theme.CFL_pink;
      case "Duplex":
      case "4-Plex":
      case "8-Plex":
      case "Apartment Complex":
        return Theme.CFL_cyan;
      case "Business":
        return Theme.CFL_lime_green;
      default:
        return Theme.CFL_gray;
    }
  };

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
            <Text style={styles.typeText}>
              {property.type ? property.type.toUpperCase() : "UNKNOWN"}
            </Text>
          </View>
        </View>


        <Text style={styles.propertyName}>{property.type}</Text>
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
            <Text style={styles.value}>
              {property["Sale Range"] && property["Sale Range"].includes("-") ? (() => {
                const [lowStr, highStr] = property["Sale Range"].split("-");
                const low = Number(lowStr);
                const high = Number(highStr);
                return (!isNaN(low) && !isNaN(high))
                  ? `${formatUSD(low)} - ${formatUSD(high)}`
                  : "Invalid Range";
              })() : "N/A"}
            </Text>
          </View>

        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Theme.CFL_app_background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}> {(user?.Assets?.Investments?.RealEstate ?? []).length > 0 ? (
          user.Assets.Investments?.RealEstate.map(renderProperty)
        ) : (
          <Text style={styles.emptyMessage}>
            No properties owned yet. Add a deal to get started!
          </Text>
        )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
  },
  content: {
    padding: 0,
    backgroundColor: Theme.CFL_app_background,
  },
  card: {
    marginVertical: Theme.CFL_card_spacing,
    backgroundColor: Theme.CFL_card_background,
    padding: 7,
    paddingVertical: 13,
    borderRadius: 10,
  },
  propertyCard: {
    backgroundColor: Theme.CFL_transparent,
    padding: 10,
    borderRadius: 10,
  },
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timestamp: {
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
  },
  typeTag: {
    fontFamily: Theme.CFL_primary_font,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    margin: 2,
  },
  typeText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  propertyName: {
    fontFamily: Theme.CFL_title_font,
    color: Theme.CFL_white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_offwhite,
    fontSize: 14,
    marginBottom: 8,
  },
  changesContainer: {
    borderTopWidth: 1,
    borderTopColor: Theme.CFL_gray,
    paddingTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  fieldName: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_light_text,
    fontSize: 14,
  },
  value: {
    color: Theme.CFL_white,
    fontSize: 14,
    fontWeight: "500",
  },
  positiveAmount: {
    color: Theme.CFL_lime_green,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
    fontWeight: "500",
  },
  negativeAmount: {
    color: Theme.CFL_red,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyMessage: {
    textAlign: "center",
    color: Theme.CFL_light_text,
    fontFamily: Theme.CFL_primary_font,
    fontSize: 16,
    marginVertical: 20,
  },
});

export default Properties;
