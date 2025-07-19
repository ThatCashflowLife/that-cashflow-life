import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useTransactions } from "../../components/context/TransactionProvider";
import { RealEstate } from "../../../interfaces/Assets";
import Theme from "../../../interfaces/theme";
import { useUser } from "../context/UserProvider";
import { formatUSD } from "../../../utils/currencyUtil";
import { formatTimestamp } from "../../../utils/timeUtil";
import SellPropertyDialog from "../features/SellPropertyDialog";
import { PassiveIncome } from "../../../interfaces/Income";
import { createPropertySaleTransaction } from "../QrCodeScanner/ScannerLogic";
const Properties = () => {
  const { user } = useUser();
  const [selectedProperty, setSelectedProperty] = useState<RealEstate | null>(null);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const { addTransactions } = useTransactions();

  const getTypeColor = (type: RealEstate["type"]) => {
    switch (type) {
      case "3Br/2Ba House":
        return Theme.CFL_pink;
      case "Duplex":
        return Theme.CFL_purple;
      case "4-Plex":
        return Theme.CFL_red;
      case "8-Plex":
        return Theme.CFL_orange;
      case "Apartment Complex":
        return Theme.CFL_cyan;
      case "Business":
        return Theme.CFL_green;
      default:
        return Theme.CFL_gray;
    }
  };
  const handleSale = (property: RealEstate) => {
    setSelectedProperty(property);
    setShowSellDialog(true);
  };


  const getAverageFromRange = (range: string): number => {
    if (!range.includes("-")) return 0;
    const [lowStr, highStr] = range.split("-");
    const low = parseFloat(lowStr.trim());
    const high = parseFloat(highStr.trim());
    if (isNaN(low) || isNaN(high)) return 0;
    return Math.round((low + high) / 2);
  };
  const typeToPassiveIncomeMap: Record<string, keyof PassiveIncome> = {
    "3Br/2Ba House": "Real Estate Income",
    "Duplex": "Real Estate Income",
    "4-Plex": "Real Estate Income",
    "8-Plex": "Real Estate Income",
    "Apartment Complex": "Real Estate Income",
    "Business": "Business Income"
  };


  const { setUser } = useUser(); // if available

  const handleConfirmSale = (salePrice: number) => {
    if (!selectedProperty) return;

    const updatedUser = { ...user };

    // Remove the sold property
    updatedUser.Assets.Investments.RealEstate = updatedUser.Assets.Investments.RealEstate.filter(
      p => p.name !== selectedProperty.name
    );

    const incomeKey = typeToPassiveIncomeMap[selectedProperty.type] || "Real Estate Income";

    // Filter out the sold property
    const remainingProperties = updatedUser.Assets.Investments.RealEstate.filter(
      p => p.name !== selectedProperty.name
    );

    // Recalculate passive income for that income category
    const updatedIncome = remainingProperties
      .filter(p => typeToPassiveIncomeMap[p.type] === incomeKey)
      .reduce((sum, p) => sum + (p["Cash Flow"] || 0), 0);

    updatedUser.income["Passive Income"][incomeKey] = updatedIncome;


    // Pay off mortgage and add profit to savings
    const mortgageAmount = selectedProperty.Mortgage || 0;
    const profit = Math.max(0, salePrice - mortgageAmount);

    // Add profit to savings
    updatedUser.Assets.Savings = (updatedUser.Assets.Savings || 0) + profit;


    // Recalculate mortgage payment
    const remainingMortgagePayment = updatedUser.Assets.Investments?.RealEstate
      ?.filter(p => p.Mortgage > 0)
      .reduce((total, p) => {
        const purchasePrice = p["Purchase Price"] || 0;
        return total + (purchasePrice * 0.10) / 12;
      }, 0) || 0;

    updatedUser.expenses["Mortgage Payment"] = remainingMortgagePayment;

    // 🧾 Add transaction to history
    const saleTransaction = createPropertySaleTransaction(selectedProperty.name, salePrice);
    addTransactions([saleTransaction]);
    console.log(saleTransaction);



    // Save everything
    setUser(updatedUser);
    setSelectedProperty(null);
    setShowSellDialog(false);
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
              { backgroundColor: getTypeColor(property.type), borderRadius: 50 },
            ]}
          >
            <Text style={styles.typeText}>
              {property.type ? property.type.toUpperCase() : "UNKNOWN"}
            </Text>
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
      <TouchableOpacity onPress={() => handleSale(property)} style={styles.button}>
        <Text style={styles.propertySell}>Sell Property</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Theme.CFL_app_background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {(user?.Assets?.Investments?.RealEstate ?? []).length > 0 ? (
            <>
              {user.Assets.Investments?.RealEstate.map(renderProperty)}
            </>
          ) : (
            <Text style={styles.emptyMessage}>
              No properties owned yet. Add a deal to get started!
            </Text>
          )}
        </View>

        <SellPropertyDialog
          isVisible={showSellDialog}
          property={selectedProperty}
          onCancel={() => {
            setSelectedProperty(null);
            setShowSellDialog(false);
          }}
          onConfirm={handleConfirmSale}
        />

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
    paddingBottom: 100,
  },
  card: {
    marginVertical: Theme.CFL_card_spacing,
    backgroundColor: Theme.CFL_card_background,
    padding: 0,
    paddingTop: 13,
    paddingBottom:0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    borderBottomWidth: 1,
    borderBottomColor: Theme.CFL_gray,
    paddingVertical: 8,
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
  button: {
    backgroundColor: "rgba(40,55,40,1)",
    borderBottomColor: Theme.CFL_green,
    borderBottomWidth: 4,
    borderTopColor: Theme.CFL_light_gray,
    borderTopWidth: 0.5,
    borderLeftColor: Theme.CFL_light_gray,
    borderLeftWidth: 0.5,
    borderRightColor: Theme.CFL_light_gray,
    borderRightWidth: 0.5,
    borderRadius: 50,
    marginTop: 15,
    height: 55,
    width:"100%",
    justifyContent: "center",
  },
  propertySell: {
    fontFamily: Theme.CFL_title_font,
    color: Theme.CFL_white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign:"center"
  }
});

export default Properties;
