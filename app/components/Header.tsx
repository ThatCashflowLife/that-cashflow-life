import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

interface HeaderProps {
  username: string;
  updateUsername: (newName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ username, updateUsername }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(username); // user typed input

  const handleSubmit = () => {
    if (tempName.trim()) {
      updateUsername(tempName.trim()); // set to user input
    } else {
      setTempName(username); // set back to original
    }
    setIsEditing(false);
  };

  return (
    // Header Container
    <View style={styles.header}>
      {/* Title */}
      <Text style={styles.headerText}>Cashflow Life</Text>
      {/* Username container */}
      <View style={styles.usernameContainer}>
        {/* If editing, show text input box */}
        {isEditing ? (
          <TextInput
            style={styles.usernameInput}
            value={tempName}
            onChangeText={setTempName}
            onBlur={handleSubmit}
            cursorColor={"#22311d"}
            autoFocus
          />
        ) : (
          // Else, Show username and edit icon
          <TouchableOpacity
            style={styles.usernameButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.username}>{username}</Text>
            <AntDesign
              name="edit"
              size={15}
              color="#22311d"
              style={styles.editIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // header container
  header: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#3e9c35",
    padding: 20,
    alignItems: "center",
    zIndex: 1000,
  },
  // header text
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#22311d",
  },
  // username container
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  // username btn
  usernameButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  // username txt
  username: {
    fontSize: 16,
    color: "#22311d",
  },
  // input box for username
  usernameInput: {
    fontSize: 16,
    color: "#22311d",
    padding: 5,
  },
  // edit username icon
  editIcon: {
    marginLeft: 5,
  },
});

export default Header;
