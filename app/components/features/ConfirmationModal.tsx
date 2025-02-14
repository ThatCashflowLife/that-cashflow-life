// import necessary libraries/methods and components
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Theme from "../../../interfaces/theme";

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
    backgroundColor: Theme.CFL_camera_overlay,
  },
  // menu container
  menuContainer: {
    backgroundColor: Theme.CFL_app_background,
    borderRadius: 12,
    shadowColor: Theme.CFL_border_black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 180,
    borderWidth: 1,
    borderColor: Theme.CFL_border_black,
    position: "absolute",
  },
  // general menu item
  // menuItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   padding: 12,
  //   // borderBottomWidth: 1,
  //   // borderBottomColor: "rgba(255, 255, 255, 0.08)",
  // },
  // general menu item txt
  // menuItemText: {
  //   marginLeft: 12,
  //   fontSize: 14,
  //   color: "#bbbbbb",
  //   // fontWeight: 500,
  // },
});

// to be imported wherever needed
export default ConfirmationModal;
