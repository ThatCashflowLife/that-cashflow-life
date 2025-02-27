// this file tells expo what our layout is, for the tab menu
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import Theme from "../../interfaces/theme";

export const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.CFL_white,
        tabBarInactiveTintColor: Theme.CFL_inactive_tab_font,
        tabBarActiveBackgroundColor: Theme.CFL_active_tab,
        tabBarInactiveBackgroundColor: Theme.CFL_inactive_tab,
        tabBarIconStyle: { width: 24, height: 24 },
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          tabBarLabel: "Finances",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
          tabBarLabelStyle: styles.tabLabel,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          tabBarLabel: "Properties",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="apartment" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
// Styling Section
const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    color: Theme.CFL_inactive_tab_font,
    fontFamily: Theme.CFL_primary_font,
    marginTop: 4,
  },
  tabBar: {
    // backgroundColor: Theme.CFL_inactive_tab,
    backgroundColor: Theme.CFL_green,
    borderTopColor: Theme.CFL_active_tab,
    borderWidth: 4,
  },
});
export default TabLayout;
