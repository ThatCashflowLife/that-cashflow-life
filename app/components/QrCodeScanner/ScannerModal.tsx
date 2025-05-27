import { BarcodeScanningResult, CameraView } from "expo-camera";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRType from "../../../interfaces/qrTypes";
import Theme from "../../../interfaces/theme";
import { Icon } from "../../../interfaces/User";
import ConfirmationModal from "../features/ConfirmationModal";
import { getIcon } from "./ScannerLogic";
import LoanDialog from "../features/LoanDialog";

interface ScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (scan: QRType) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  onClose,
  onScan,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isLoan, setIsLoan] = useState(false);
  const [scanData, setScanData] = useState<QRType | null>(null);
  const [popupInfo, setPopupInfo] = useState<{
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    professionIcon?: Icon;
  }>({ title: "", message: "", confirmText: "", cancelText: "" });

  const handleScan = (result: BarcodeScanningResult) => {
    if (!isScanning) return;

    setIsScanning(false);
    try {
      const scan: QRType = {
        type: result.type,
        data: JSON.parse(result.data),
      };

      const popup = getPopupMessage(scan);
      if (popup) setPopupInfo(popup);

      const transactionName = scan.data.name?.toLowerCase() || "";
      setIsLoan(transactionName.includes("loan"));

      setPopupVisible(true);
      setScanData(scan);
    } catch (error) {
      console.error("QR does not contain valid JSON data", error);
      Alert.alert("QR Code Error", "QR Code does not contain the expected format.", [
        {
          text: "OK",
          onPress: () => {
            setIsScanning(true);
          },
        },
      ]);
    }
  };

  const getPopupMessage = (
    scan: QRType
  ):
    | {
      title: string;
      professionIcon?: Icon;
      message: string;
      confirmText: string;
      cancelText: string;
    }
    | undefined => {
    if (scan && scan.data) {
      if (scan.data.scanType === "Transaction") {
        const transactionName = scan.data.name?.toLowerCase() || "";
        const isBaby = transactionName.includes("baby");
        const isLoan = transactionName.includes("loan");

        const title = isBaby
          ? "It's a Baby!"
          : isLoan
            ? "You've Been Approved!"
            : "Transaction";

        const message = isBaby
          ? "You're about to add a new baby. This will increase your children count and update your expenses."
          : isLoan
            ? "You're about to take out a loan. This will increase your loan count and increase your expenses."
            : `Apply transaction: ${scan.data.name}?`;

        const confirmText = isBaby
          ? "Add Baby"
          : isLoan
            ? "Accept Loan"
            : "Confirm";

        return {
          ...popupInfo,
          title,
          message,
          confirmText,
          cancelText: "Cancel",
        };
      } else if (scan.data.scanType === "Profession") {
        return {
          ...popupInfo,
          title: `Congrats, You're Hired!`,
          professionIcon: getIcon(scan.data.name),
          message: `${scan.data.name}`,
          confirmText: `Thanks!`,
          cancelText: `Cancel`,
        };
      }

      return {
        ...popupInfo,
        title: "",
        message: `Unfortunately... We didn't recognize this scan`,
        confirmText: `Ok`,
        cancelText: `Cancel`,
      };
    }
  };

  const handleScanConfirm = () => {
    setPopupVisible(false);
    if (scanData) {
      onScan(scanData!);
    } else {
      Alert.alert("Data failed to load from scan");
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={isScanning ? handleScan : undefined}
        >
          <View style={styles.backgroundOverlay}>
            <View style={styles.innerOverlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.scanText}>Place QR Code here</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

          {popupVisible && isLoan ? (
            <LoanDialog
              isVisible={popupVisible}
              onSubmit={(loanAmount: string, paymentAmount: string, purpose: string) => {
                setPopupVisible(false);
                onScan({
                  ...scanData!,
                  data: {
                    ...scanData!.data,
                    loanDetails: {
                      amount: parseFloat(loanAmount),
                      payment: parseFloat(paymentAmount),
                      purpose,
                    },
                  },
                });
              }}
              onCancel={() => {
                setPopupVisible(false);
                setIsScanning(true);
              }}
            />
          ) : (
            popupVisible && (
              <ConfirmationModal
                isVisible={popupVisible}
                title={popupInfo.title}
                professionIcon={popupInfo.professionIcon}
                message={popupInfo.message}
                onConfirm={handleScanConfirm}
                onCancel={() => {
                  setPopupVisible(false);
                  setIsScanning(true);
                }}
              />
            )
          )}
        </CameraView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.CFL_card_background,
  },
  camera: {
    flex: 1,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.CFL_camera_overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  innerOverlay: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(255,255,255,0)",
    borderColor: "rgba(255, 255, 255, 0)",
    borderWidth: 2,
    borderRadius: 12,
  },
  scanFrame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: Theme.CFL_white,
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius: 12,
  },
  scanText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 12,
    backgroundColor: Theme.CFL_danger_button,
    borderRadius: 8,
    zIndex: 2,
  },
  closeText: {
    fontFamily: Theme.CFL_primary_font,
    color: Theme.CFL_white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ScannerModal;
