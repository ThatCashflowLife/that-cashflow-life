import User from "@/interfaces/user";
import { Feather, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import UserMenu from "./UserMenu";

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
    // Get the position of the menu button
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({
        top: y,
        right: Dimensions.get("window").width - x - width,
      });
      setIsMenuVisible(true);
    });
  };

  const handleSubmit = () => {
    if (tempName.trim()) {
      updateUsername(tempName.trim()); // set to user input
    } else {
      setTempName(username); // set back to original
    }
    setIsEditing(false);
  };

  return (
    <>
      {/* Header Container */}
      <View style={styles.header}>
        {/* Header Text Container */}
        <View style={styles.headerText}>
          {/* Title */}
          <Text style={styles.title}>Cashflow Life</Text>
          {/* Username display */}
          <Text style={styles.username}>{username}</Text>
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
          console.log("new game created");
          setIsMenuVisible(false);
        }}
        onEditUsername={() => {
          setIsEditing(true);
          setIsMenuVisible(false);
        }}
        anchorPosition={menuPosition}
      />
    </>
  );
};

const styles = StyleSheet.create({
  // header container
  header: {
    marginTop: 5,
    width: "100%",
    backgroundColor: "#3e9c35",
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
    overflowX: "hidden",
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
  // menu btn
  menu: {
    padding: 8,
    position: "absolute",
    right: 20,
    top: "65%",
  },
});

export default Header;
