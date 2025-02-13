// import necessary libraries/methods and components
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Theme from "../interfaces/theme";
import User from "../interfaces/user";
import blankUser from "../testData/blankUser";
import Header from "./components/Header/Header";
import TabMenu, { Tab } from "./components/Menus/TabMenu";
import Properties from "./components/Properties/Properties";
import ScannerButton from "./components/QrCodeScanner/ScannerButton";
import LatestTransaction from "./components/TransactionLog/LatestTransaction";
import TransactionLog from "./components/TransactionLog/TransactionLog";
import FinancialOverview from "./components/UserFinances/FinancialOverview";
import FinancialStatement from "./components/UserFinances/FinancialStatement";

// App/index.tsx is the top level of the app, where all components reside (the home page)
// Sometimes this is called App.tsx, but expo looks for index.tsx
export default function App() {
  const [user, setUser] = useState<User>(blankUser);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  // logic/Functions Section

  // load the username when the component mounts
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

  // this will get the data from a qr scan
  const handleScan = () => {
    console.log("getting data from qr scan.");
    const currTime = new Date().toISOString().slice(0, 16);
    console.log("time of scan: ", currTime);
  };
  // chooses which component to render based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <ScrollView
            style={[
              styles.scrollView,
              { backgroundColor: Theme.Colors.CFL_black },
            ]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.appContent}>
              <View
                style={[
                  styles.card,
                  { backgroundColor: Theme.Colors.CFL_black },
                ]}
              >
                <ScannerButton onScan={handleScan} />
              </View>
              <View style={styles.card}>
                <FinancialOverview user={user} />
              </View>
              <View style={styles.card}>
                <LatestTransaction />
              </View>
            </View>
          </ScrollView>
        );

      case "transactions":
        return (
          <ScrollView
            style={[
              styles.scrollView,
              { backgroundColor: Theme.Colors.CFL_black },
            ]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.appContent}>
              <View>
                <TransactionLog user={user} />
              </View>
            </View>
          </ScrollView>
        );

      case "finances":
        return (
          <ScrollView
            style={[
              styles.scrollView,
              { backgroundColor: Theme.Colors.CFL_black },
            ]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.appContent}>
              <View>
                <FinancialStatement user={user} />
              </View>
            </View>
          </ScrollView>
        );
      case "properties":
        return (
          <ScrollView
            style={[
              styles.scrollView,
              { backgroundColor: Theme.Colors.CFL_black },
            ]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.appContent}>
              <View>
                <Properties user={user} />
              </View>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    // Safe Area avoids the phones header (battery, cell service)
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <Header
          username={user.name}
          updateUsername={handleUpdateUsername}
          user={user}
        />
        {renderTabContent()}
      </View>
      <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}

// styling and class names for the above components, defined by their "style" tag
const styles = StyleSheet.create({
  container: {
    flex: 1, // ensure app takes up whole screen
    backgroundColor: "#121212",
  },
  // scrollable view
  scrollView: {
    flex: 1,
    backgroundColor: Theme.Colors.CFL_black,
  },
  // scrollable content
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  // home page content
  appContent: {
    padding: 16,
  },
  // card for each component
  card: {
    marginVertical: 8, // space between components
    backgroundColor: "#1e1e1e", // lighter card background
    padding: 7,
    borderRadius: 10,
  },
});
