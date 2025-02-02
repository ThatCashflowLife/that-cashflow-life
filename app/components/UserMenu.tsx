import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface UserMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onEditUsername: () => void;
  anchorPosition: { top: number; right: number }; // positioning relative to the menu btn
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
              top: anchorPosition.top + 40, // keep menu below the header
              right: anchorPosition.right + 16, // align left/right with menu btn
            },
          ]}
        >
          <TouchableOpacity style={styles.menuItem} onPress={onEditUsername}>
            <Feather name="edit" size={18} color="#bbbbbb" />
            <Text style={styles.menuItemText}>Edit Username</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.newGameBtn]}
            onPress={onNewGame}
          >
            <Feather name="trash-2" size={18} color="#d11a2a" />
            <Text style={[styles.menuItemText, styles.newGameTxt]}>
              Reset Game
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
    backgroundColor: "rgba(0, 0, 0, .4)",
  },
  menuContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 180,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    position: "absolute",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#bbbbbb",
    fontWeight: 500,
  },
  newGameBtn: {
    borderBottomWidth: 0,
    backgroundColor: "rgba(255, 69, 69, 0.1)",
  },
  newGameTxt: {
    color: "#ff4545",
    fontWeight: 600,
  },
});

export default UserMenu;
