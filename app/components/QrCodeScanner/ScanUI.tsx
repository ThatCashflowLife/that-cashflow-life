import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCodeScannerModal from './Scanner';

interface ScanUIProps {
 // add handle scan type here
}

const ScanUI: React.FC<ScanUIProps> = ({  }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleScan = (data: any | null) => {
    // what do we want to do when it scans?
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Scan a Card</Text>

      {/* QR Scanner Modal */}
      <QRCodeScannerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onScan={handleScan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

});

export default ScanUI;
