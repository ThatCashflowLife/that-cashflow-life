// import necessary libraries/methods and components
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import User from "../../../interfaces/user";
import UserMenu from "../Menus/UserMenu";

// type definition for header properties
interface HeaderProps {
  username: string;
  updateUsername: (newName: string) => void;
  user: User;
}

const Header: React.FC<HeaderProps> = ({ username, updateUsername, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(username); // user typed input
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuButtonRef = React.useRef<View>(null);

  const handleMenuVisibility = () => {
    // Logic/ Functions Section
    // Get the position of the menu button
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({
        top: y,
        right: Dimensions.get("window").width - x - width,
      });
      setIsMenuVisible(true);
    });
  };

  const handleEditUsername = () => {
    setIsMenuVisible(false); // close the menu
    setTempName(username); // reset temp name to current username
    // short delay for smoothness
    setTimeout(() => {
      setIsEditing(true); // trigger text input to be visible in header
    }, 100);
  };

  const handleSubmit = () => {
    if (tempName.trim()) {
      updateUsername(tempName.trim()); // set to user input
    } else {
      setTempName(username); // set back to original
    }
    setIsEditing(false);
  };

  // clear async storage (wipes all saved data)
  const handleNewGame = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Storage completely cleared!");
    } catch (error) {
      console.error("Failed to clear async storage:", error);
    }
  };

  // Tsx Section
  return (
    <>
      {/* Header Container */}
      <View style={styles.header}>
        {/* Header Text Container */}
        <View style={styles.headerText}>
          {/* Title */}
          <Text style={styles.title}>Cashflow Life</Text>

          {/* Username display */}
          {isEditing ? (
            <TextInput
              style={styles.usernameInput}
              value={tempName}
              onChangeText={setTempName}
              onBlur={handleSubmit}
              cursorColor="#22311d"
              autoFocus
              selectTextOnFocus
              onSubmitEditing={handleSubmit}
              placeholder={username}
              placeholderTextColor="rgba(34, 65, 29, 0.5)"
            />
          ) : (
            <Text style={styles.username}>{username}</Text>
          )}
        </View>

        {/* Menu Btn */}
        <TouchableOpacity
          style={styles.menu}
          onPress={handleMenuVisibility}
          activeOpacity={0.7}
          ref={menuButtonRef}
        >
          <Feather name="menu" size={30} color="#22311d" />
        </TouchableOpacity>
      </View>

      {/* User Menu  */}
      <UserMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onNewGame={() => {
          handleNewGame();
          setIsMenuVisible(false);
        }}
        onEditUsername={handleEditUsername}
        anchorPosition={menuPosition}
      />
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // header container
  header: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "#4cb348",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  // header txt
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#22311d",
    alignItems: "center",
    maxWidth: 200,
  },
  // CashFlow Life title
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22311d",
    textAlign: "center",
  },
  // username txt
  username: {
    fontSize: 16,
    color: "#22411d",
    textAlign: "center",
    marginTop: 4,
  },
  // username txt while editing
  usernameInput: {
    fontSize: 16,
    color: "#22411d",
    textAlign: "center",
    marginTop: 4,
    padding: 3,
    minWidth: 120,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
  },
  // menu btn
  menu: {
    padding: 8,
    position: "absolute",
    right: 20,
  },
});

// exported to be called within Index.tsx
export default Header;
