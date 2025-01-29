// import necessary libraries/methods and components
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

// Properties definition for the modal (similiar to a class definition)
interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}
// Ensure the Props are passed to the modal component itself
const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  // Logic/ Functions Section
  const [error, setError] = useState<string | null>(null);

  // whenever visible state changes, it will run this code
  useEffect(() => {
    if (visible) {
      // if the modal is visible it logs
      console.log("Attempting to access camera");
    }
  }, [visible]);

  // simulating a scan for emulator purposes
  const simulateScan = () => {
    const mockQRCode = "https://example.com/sample-qr-code";
    onScan(mockQRCode);
    onClose();
  };

  // Tsx Section
  return (
    // Modal Component (imported from react-native)
    <Modal
      visible={visible} // is the modal visible
      transparent={true} // renders modal over a transparent bg
      animationType="none"
      onRequestClose={onClose} // What happens when user hits the back btn on their phone
    >
      {/* Container for the Scanner */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        {/* Text Container */}
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            QR Code Scanner
          </Text>

          {/* if error is true, Show the error text */}
          {error && (
            <Text
              style={{
                color: "red",
                marginBottom: 15,
              }}
            >
              Error accessing camera: {error}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Simulate Scan Button */}
            <TouchableOpacity
              onPress={simulateScan}
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Simulate Scan</Text>
            </TouchableOpacity>
            {/* Close Scanner button */}
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "gray",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// exported to be called within ScannerButton.tsx
export default ScannerModal;
