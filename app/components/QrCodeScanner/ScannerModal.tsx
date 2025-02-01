import { CameraView, BarcodeScanningResult } from "expo-camera";
import { Modal, TouchableOpacity, Text, StyleSheet, View } from "react-native";

// Scanner modal properties definition
interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (result: { type: string; data: string }) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  // Logic/Functions Section
 
  // Tsx Section
  return (
    // Modal to hold the Camera
    <Modal visible={visible} onRequestClose={onClose} animationType="none">
      <View style={styles.container}>
        {/* Camera for Scanning */}
        <CameraView
          style={styles.camera}
          onBarcodeScanned={(result: BarcodeScanningResult) => {
            onScan({ type: result.type, data: result.data });
          }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        >
          {/* Close button within Camera window */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </CameraView>
      </View>
    </Modal>
  );
};

// Styling Section
const styles = StyleSheet.create({
  // Modal Container
  container: {
    flex: 1,
  },
  // Camera
  camera: {
    flex: 1,
  },
  // Close Camera btn
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 5,
  },
  // Close camera btn txt
  closeText: {
    color: "white",
    fontSize: 16,
  },
});

// export to call in ScannerButton.tsx
export default ScannerModal;
