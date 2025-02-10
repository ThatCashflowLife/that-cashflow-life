// import necessary libraries/methods and components
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Tab = "home" | "properties" | "finances" | "transactions";

// Tab Menu properties type definition
interface TabMenuProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "finances", label: "Finances", icon: "attach-money" },
  { key: "transactions", label: "Transactions", icon: "receipt" },
  { key: "properties", label: "Properties", icon: "apartment" },
] as const;

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
  // Logic/Functions Section

  // Tsx Section
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <MaterialIcons
            name={tab.icon}
            size={24}
            color={activeTab === tab.key ? "#ffffff" : "#666666"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.key && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styling Section
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#2e2e2e",
  },
  tabLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#ffffff",
  },
});

// export to be called in index.tsx
export default TabMenu;
