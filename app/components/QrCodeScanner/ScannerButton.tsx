// import necessary libraries/methods and components
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import ScannerModal from "./ScannerModal";

// Properties passed to the Scanner Button component (similiar to a class definition)
interface ScannerButtonProps {}

const ScannerButton: React.FC<ScannerButtonProps> = ({}) => {
  // Logic/Functions Section
  const [isModalVisible, setModalVisible] = useState(false); // Boolean for modal visibility

  // function to get device camera permission from user 
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

  // handle opening the Qr Code Scanner
  const handleOpenScanner = async () => {
    const hasPermission = await requestCameraPermission(); // get permission
    if (hasPermission) {
      setModalVisible(true); // if theres permission flip the visible boolean
    }
  };

  // handle the scanned data
  const handleScan = (data: string | null) => {
    if (data) {
      console.log("Scanned Data:", data);
    }
  };

  // Tsx Section
  return (
    <>
      {/* Button to open the scanner */}
      <TouchableOpacity style={styles.button} onPress={handleOpenScanner}>
        <Text style={styles.buttonText}>Scan a Card</Text>
      </TouchableOpacity>

      {/* QR Scanner Modal */}
      <ScannerModal
        visible={isModalVisible} // pass the visible prop to the modal
        onClose={() => setModalVisible(false)} // close modal by making it not visible
        onScan={handleScan} // what function runs when it scans
      />
    </>
  );
};

// Styling Section
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

// exported to be called within Index.tsx
export default ScannerButton;
