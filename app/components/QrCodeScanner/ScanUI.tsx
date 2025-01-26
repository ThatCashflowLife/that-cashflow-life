import React, { useState } from "react";
import {
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";

import ScannerModal from "./ScannerModal"; // Assuming this is your QR scanner modal

interface ScanUIProps {}

const ScanUI: React.FC<ScanUIProps> = ({}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === "granted") {
      return true;
    } else {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to scan QR codes."
      );
      return false;
    }
  };

  const handleOpenScanner = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setModalVisible(true); // Open the modal if permission is granted
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      console.log("Scanned Data:", data);
    }
  };

  return (
    <>
      {/* Button to open the scanner */}
      <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
        <Text style={styles.buttonText}>Scan a Card</Text>
      </TouchableOpacity>

      {/* QR Scanner Modal */}
      <ScannerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onScan={handleScan}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 8,
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

export default ScanUI;
