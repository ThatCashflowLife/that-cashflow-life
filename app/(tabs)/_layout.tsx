// this file tells expo what our layout is, for the tab menu
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import blankUser from "../../data/testData/blankUser";
import Theme from "../../interfaces/theme";
import User from "../../interfaces/user";
import Header from "../components/Header/Header";

// allows user to be accessed globally
const UserContext = createContext<User>(blankUser);

// this is what can be called to get User in other components (has to be names useUser for custom react-hook)
export function useUser() {
  return useContext(UserContext);
}
export const TabLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User>(blankUser);

  // load the user when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(blankUser);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, [user]);

  // saves the username in local/async storage
  const handleUpdateUsername = async (newName: string) => {
    try {
      const updatedUser = {
        ...user,
        name: newName,
      };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error saving username:", error);
    }
  };

  return (
    <UserContext.Provider value={user}>
      <View style={styles.container}>
        {/* Safe Area avoids the phones header (battery, cell service) */}
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <Header
            username={user.name}
            updateUsername={handleUpdateUsername}
            user={user}
          />

          {/* Tab Menu, controls page display */}
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
                  <MaterialIcons
                    name="attach-money"
                    size={size}
                    color={color}
                  />
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
              name="assets"
              options={{
                tabBarLabel: "Properties",
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="apartment" size={size} color={color} />
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </View>
    </UserContext.Provider>
  );
};
// Styling Section
const styles = StyleSheet.create({
  // whole app container
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: Theme.CFL_app_background,
  },
  // label for each
  tabLabel: {
    fontSize: 12,
    color: Theme.CFL_inactive_tab_font,
    fontFamily: Theme.CFL_primary_font,
    marginTop: 4,
  },
  // whole tab menu bar
  tabBar: {
    // backgroundColor: Theme.CFL_inactive_tab,
    backgroundColor: Theme.CFL_green,
    borderTopColor: Theme.CFL_active_tab,
    borderWidth: 4,
  },
});

export default TabLayout;
