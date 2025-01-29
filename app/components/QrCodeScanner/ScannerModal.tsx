import { CameraView } from "expo-camera";
import { Modal, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { scanResult } from "./ScannerButton";

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
  const handleScan = (scanResult: scanResult) => {
    onScan(scanResult);
  };
  return (
    // Modal to hold the Camera
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        {/* Camera for Scanning */}
        <CameraView style={styles.camera} facing={"back"}>
          {/* Close button within Camera window */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </CameraView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
});

export default ScannerModal;
