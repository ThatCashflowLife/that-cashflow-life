import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';

interface QRCodeScannerModalProps {
  visible: boolean;
  onClose: () => void; // Function to close the modal
  onScan: (data: any) => void; // Function to handle the scanned data
}

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  const handleScan = (e: { data: string }) => {
    try {
      const parsedData = JSON.parse(e.data); // Assuming QR code contains JSON
      onScan(parsedData);
      onClose(); // Close the modal after successful scan
    } catch (error) {
      Alert.alert('Error', 'Invalid QR Code. Please try again.');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
    </Modal>
  );
};

const styles = StyleSheet.create({
 
});

export default QRCodeScannerModal;
