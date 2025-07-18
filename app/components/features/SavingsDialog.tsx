import React, { useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, Animated, TouchableOpacity, View } from "react-native";
import Theme from "../../../interfaces/theme";
import { createSavingsTransaction } from "../QrCodeScanner/ScannerLogic";
import CDList from "./CDList";
import User from "../../../interfaces/User";
import CustomKeypad from "../CustomKeypad";

interface Props {
    isVisible: boolean;
    onSubmit: (amount: number, type: "deposit" | "withdrawal") => void;
    onCancel: () => void;
    onManageCDs: () => void;
    user: User;
}

const SavingsDialog: React.FC<Props> = ({ isVisible, onSubmit, onCancel, onManageCDs, user }) => {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"deposit" | "withdrawal">("deposit");
    const [activeField, setActiveField] = useState(null);
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
    const [focusAnim, setFocusAnim] = useState({
            amount: new Animated.Value(0),
        });
    const handleKeypadPress = (key) => {
        const update = (current) => (key === "←" ? current.slice(0, -1) : current + key);
        if (activeField === "amount") setAmount(update(amount));
    };
    const amountBorderColor = focusAnim.amount.interpolate({
            inputRange: [0, 1],
            outputRange: ["#ccc", Theme.CFL_green],
        });
        const amountBorderWidth = focusAnim.amount.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 5],
        });
    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Manage Savings</Text>

                    <TouchableOpacity onPress={() => { setActiveField("amount"); }}>
                        <Animated.View style={[styles.inputContainer, { borderColor: amountBorderColor, borderBottomWidth: amountBorderWidth }]}>
                            <Text style={amount ? styles.inputText : styles.inputPlaceholder}>{amount || "Enter payment amount"}</Text>
                        </Animated.View>
                    </TouchableOpacity>

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
                        <CDList cds={user?.Assets?.Investments?.CDs ?? []} />
                    
                    <TouchableOpacity style={styles.cd} onPress={onManageCDs}>
                        <Text style={styles.submitText}>Manage CD's</Text>
                    </TouchableOpacity>
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomKeypad onPress={handleKeypadPress} />
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
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,1)",
        borderRadius: 0,
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
        borderRadius: 25,
        marginHorizontal: 4,
        alignItems: "center",  marginVertical: 4,
    },
    selected: {
         backgroundColor: "rgba(40,55,40,1)", borderBottomColor: Theme.CFL_green, borderBottomWidth: 4, borderTopColor: Theme.CFL_light_gray, borderTopWidth: 0.5, borderLeftColor: Theme.CFL_light_gray, borderLeftWidth: 0.5, borderRightColor: Theme.CFL_light_gray, borderRightWidth: 0.5 
    },
    toggleText: {
        color: "#fff",
        fontWeight: "bold",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 15,
    },
    cancel: {
        marginRight: 15,
        backgroundColor: Theme.CFL_red,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        flex:1,
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
        flex:3,
    }, cd: {
        backgroundColor: Theme.CFL_green,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    submitText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    }, inputContainer: { padding: 8, marginBottom: 15, borderRadius: 50 },
    inputText: { fontSize: 19, color: "#fff", paddingLeft: 15 },
    inputPlaceholder: { fontSize: 17, color: "#aaa", paddingLeft: 15 },
});

export default SavingsDialog;
