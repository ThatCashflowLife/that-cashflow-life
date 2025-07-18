import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { RealEstate } from "../../../interfaces/Assets";
import Theme from "../../../interfaces/theme";

interface SellPropertyDialogProps {
    isVisible: boolean;
    property: RealEstate | null;
    onCancel: () => void;
    onConfirm: (salePrice: number) => void;
}

const SellPropertyDialog: React.FC<SellPropertyDialogProps> = ({
    isVisible,
    property,
    onCancel,
    onConfirm,
}) => {
    const [salePrice, setSalePrice] = useState("");

    const handleConfirm = () => {
        const parsedPrice = parseFloat(salePrice);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Alert.alert("Invalid Price", "Please enter a valid sale price.");
            return;
        }

        onConfirm(parsedPrice);
        setSalePrice("");
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Sell Property</Text>
                    {property && (
                        <>
                            <Text style={styles.label}>Property: {property.name}</Text>
                            <TextInput
                                placeholder="Enter Sale Price"
                                placeholderTextColor="#aaa"
                                keyboardType="numeric"
                                style={styles.input}
                                value={salePrice}
                                onChangeText={setSalePrice}
                            />

                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
                                    <Text style={styles.confirmText}>Confirm Sale</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 20,
    },
    dialog: {
        backgroundColor: Theme.CFL_card_background,
        padding: 20,
        borderRadius: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Theme.CFL_white,
        marginBottom: 12,
    },
    label: {
        color: Theme.CFL_light_text,
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderBottomColor: Theme.CFL_gray,
        borderBottomWidth: 1.5,
        marginBottom: 20,
        color: Theme.CFL_white,
        fontSize: 16,
        paddingVertical: 6,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancel: {
        flex: 1,
        marginRight: 10,
        backgroundColor: Theme.CFL_danger_button,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    confirm: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: Theme.CFL_green,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelText: {
        color: "#fff",
        fontWeight: "bold",
    },
    confirmText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default SellPropertyDialog;
