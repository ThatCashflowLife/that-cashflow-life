// import necessary libraries/methods and components
import { useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import QRType, { QRData } from "../../../interfaces/qrTypes";
import Theme from "../../../interfaces/theme";
import ScannerModal from "./ScannerModal";

// Properties passed to the Scanner Button component (similiar to a class definition)
interface ScannerButtonProps {
  onScan: (data: QRData) => void; // callback to get data from Scanner Modal
  buttonStyle?: ViewStyle;    // allow passing custom style
  iconSize?: number;          // allow custom icon size
  text: string;
}

const ScannerButton: React.FC<ScannerButtonProps> = ({ onScan, buttonStyle, iconSize = 48, text }) => {

  // Logic/Functions Section
  const [isCameraVisible, setCameraVisible] = useState(false); // boolean for camera modal visibility
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
    setCameraVisible(true); // open modal if we have permission
  };

  // handles the logic post scan
  const handleScan = (scan: QRType) => {
    if (scan.type === "qr") {
      onScan(scan.data); // pass data back to home.tsx
      setCameraVisible(false); // close the modal
    } else {
      Alert.alert("Not a QR Code", "The Scanned item must be a QR code.");
    }
  };

  // Tsx Section
  return (
    <>
      {/* Button to Open Modal */}
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={handleOpenScanner}>
        <MaterialIcons name="qr-code-scanner" size={iconSize} color="#fff" />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>

      {/* QR Scanner Modal Component */}
      {isCameraVisible && (
        <ScannerModal
          visible={isCameraVisible}
          onClose={() => setCameraVisible(false)}
          onScan={handleScan}
        />
      )}
    </>
  );
};

// Styling Section
const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 75,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 10,
    shadowColor: "rgba(255,255,255,1)",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  buttonText: {
    color: Theme.CFL_white,
    bottom: 0,
    
  },
});

// exported to be called within Index.tsx
export default ScannerButton;
