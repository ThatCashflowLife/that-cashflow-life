import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      console.log("Attempting to access camera");
    }
  }, [visible]);

  const simulateScan = () => {
    const mockQRCode = "https://example.com/sample-qr-code";
    onScan(mockQRCode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
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

export default ScannerModal;
