// import necessary libraries/methods and components
import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

// type definition for menu properties
interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
}) => {
  // Logic/Functions Section
  if (!isVisible) return null;

  // Tsx Section
  return (
    // Modal for overlay
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Allows menu close */}
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        {/* Menu Container */}
        <View style={styles.menuContainer}>
          <Text>THIS WILL BE A CONFIRMATION MODAL</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // overlay/background
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .4)",
  },
  // menu container
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
  // general menu item
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  // general menu item txt
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#bbbbbb",
    // fontWeight: 500,
  },
});

// to be imported wherever needed
export default ConfirmationModal;
