// import necessary libraries/methods and components
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Theme from "../../../interfaces/theme";

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
            color={
              activeTab === tab.key
                ? Theme.CFL_white
                : Theme.CFL_inactive_tab_font
            }
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
    backgroundColor: Theme.CFL_inactive_tab,
    borderTopColor: Theme.CFL_active_tab,
    borderWidth: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: Theme.CFL_active_tab,
  },
  tabLabel: {
    fontSize: 12,
    color: Theme.CFL_inactive_tab_font,
    marginTop: 4,
  },
  activeTabLabel: {
    color: Theme.CFL_white,
  },
});

// export to be called in index.tsx
export default TabMenu;
