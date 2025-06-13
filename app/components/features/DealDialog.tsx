import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker"; // ← Dropdown
import Theme from "../../../interfaces/theme";

const DealDialog = ({ isVisible, onSubmit, onCancel }) => {
    const [cashflow, setCashflow] = useState("");
    const [mortgage, setMortgage] = useState("");
    const [incomeType, setIncomeType] = useState("Real Estate Income"); // default

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add Deal</Text>

                    {/* Cashflow Input */}
                    <Text style={styles.label}>Monthly Cashflow</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter monthly cashflow"
                        placeholderTextColor="#777"
                        keyboardType="numeric"
                        value={cashflow}
                        onChangeText={setCashflow}
                    />

                    {/* Mortgage Input */}
                    <Text style={styles.label}>Mortgage Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter mortgage amount"
                        placeholderTextColor="#777"
                        keyboardType="numeric"
                        value={mortgage}
                        onChangeText={setMortgage}
                    />

                    {/* Passive Income Type Picker */}
                    <Text style={styles.label}>Income Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={incomeType}
                            onValueChange={(itemValue) => setIncomeType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Real Estate Income" value="Real Estate Income" />
                            <Picker.Item label="Dividends" value="Dividends" />
                            <Picker.Item label="Business Income" value="Business Income" />
                            <Picker.Item label="Interest" value="Interest" />
                        </Picker>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => onSubmit(parseFloat(cashflow), parseFloat(mortgage), incomeType)}
                        >
                            <Text style={styles.confirmText}>Add Deal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Styling (simplified version)
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: 20,
    },
    container: {
        backgroundColor: "#222",
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#fff",
    },
    label: {
        fontSize: 16,
        color: "#aaa",
        marginBottom: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        fontSize: 20,
        color: "#fff",
        marginBottom: 15,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: {
        color: "#999",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: Theme.CFL_danger_button,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 5,
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: Theme.CFL_green,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 5,
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

export default DealDialog;
