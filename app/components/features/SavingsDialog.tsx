import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Theme from "../../../interfaces/theme";
import { createSavingsTransaction } from "../QrCodeScanner/ScannerLogic";

interface Props {
    isVisible: boolean;
    onSubmit: (amount: number, type: "deposit" | "withdrawal") => void;
    onCancel: () => void;
}

const SavingsDialog: React.FC<Props> = ({ isVisible, onSubmit, onCancel }) => {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"deposit" | "withdrawal">("deposit");

    const handleSubmit = () => {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            Alert.alert("Invalid Amount", "Please enter a valid number greater than 0.");
            return;
        }
        
        onSubmit(parsedAmount, type);
        setAmount("");
        setType("deposit");
    };

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Manage Savings</Text>

                    <TextInput
                        placeholder="Enter amount"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.toggle, type === "deposit" && styles.selected]}
                            onPress={() => setType("deposit")}
                        >
                            <Text style={styles.toggleText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggle, type === "withdrawal" && styles.selected]}
                            onPress={() => setType("withdrawal")}
                        >
                            <Text style={styles.toggleText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    dialog: {
        width: "85%",
        backgroundColor: "rgba(40,40,40,1)",
        borderRadius: 20,
        padding: 20,
        elevation: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: Theme.CFL_primary_font,
        marginBottom: 15,
        color: "#fff",
    },
    input: {
        backgroundColor: "#333",
        color: "#fff",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    toggle: {
        flex: 1,
        padding: 12,
        backgroundColor: "#444",
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: "center",
    },
    selected: {
        backgroundColor: Theme.CFL_green,
    },
    toggleText: {
        color: "#fff",
        fontWeight: "bold",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    cancel: {
        marginRight: 15,
        backgroundColor: Theme.CFL_red,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    cancelText: {
        color: "#000",
        fontSize: 16,
    },
    submit: {
        backgroundColor: Theme.CFL_green,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    submitText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default SavingsDialog;
