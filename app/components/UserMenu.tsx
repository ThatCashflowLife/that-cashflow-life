import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface UserMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onEditUsername: () => void;
  anchorPosition: { top: number; right: number }; // Position from the menu button
}

const UserMenu: React.FC<UserMenuProps> = ({
  isVisible,
  onClose,
  onNewGame,
  onEditUsername,
  anchorPosition,
}) => {
  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={[
            styles.menuContainer,
            {
              position: "absolute",
              top: anchorPosition.top + 40, // Below the header
              right: anchorPosition.right + 16, // Align with menu button
            },
          ]}
        >
          <TouchableOpacity style={styles.menuItem} onPress={onEditUsername}>
            <Feather name="edit" size={18} color="#22311d" />
            <Text style={styles.menuItemText}>Edit Username</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.dangerItem]}
            onPress={onNewGame}
          >
            <Feather name="trash-2" size={18} color="#d11a2a" />
            <Text style={[styles.menuItemText, styles.dangerText]}>
              New Game
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 180,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#22311d",
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: "#d11a2a",
  },
});

export default UserMenu;
