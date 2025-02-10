// import necessary libraries/methods and components
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import ScannerModal from "./ScannerModal";

// Properties passed to the Scanner Button component (similiar to a class definition)
interface ScannerButtonProps {
  onScan: (data: string) => void; // callback to get data from Scanner Modal
}

export type scanResult = {
  type: string;
  data: string;
};

const ScannerButton: React.FC<ScannerButtonProps> = ({ onScan }) => {
  // Logic/Functions Section
  const [isModalVisible, setModalVisible] = useState(false); // boolean for modal visibility
  const [permission, requestPermission] = useCameraPermissions(); // set camera permission hook

  // handle opening the qr code scanner
  const handleOpenScanner = async () => {
    if (!permission?.granted) {
      // if we don't have permission, get it
      const permissionResult = await requestPermission();
      if (!permissionResult?.granted) {
        // If permission is denied, notify user
        Alert.alert(
          "Permission required",
          "Camera permission is required to scan QR Codes."
        );
        return;
      }
    }
    setModalVisible(true); // open modal if we have permission
  };

  // handles the logic post scan
  const handleScan = ({ type, data }: scanResult) => {
    if (type === "qr") {
      onScan(data); // pass data back to index.tsx
      setModalVisible(false); // close the modal
    } else {
      Alert.alert("Not a QR Code", "The Scanned item must be a QR code.");
    }
  };

  // Tsx Section
  return (
    <>
      {/* Button to Open Modal */}
      <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      {/* QR Scanner Modal Component */}
      {isModalVisible && (
        <ScannerModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onScan={handleScan}
        />
      )}
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

// exported to be called within Index.tsx
export default ScannerButton;
