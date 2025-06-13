import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Theme from "../../../interfaces/theme";

const PaymentDialog = ({ isVisible, onSubmit, onCancel }) => {

    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Personal Loan");

    const [focusAnim, setFocusAnim] = useState({
        amount: new Animated.Value(0),
    });

    const handleFocus = (field: keyof typeof focusAnim) => {
        Animated.timing(focusAnim[field], {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = (field: keyof typeof focusAnim) => {
        Animated.timing(focusAnim[field], {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    // Animation: amount input border
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
                <View style={styles.container}>
                    <Text style={styles.title}>Submit a Payment</Text>

                    {/* Animated Amount Input */}
                    <Animated.View
                        style={[
                            styles.inputContainer,
                            { borderColor: amountBorderColor, borderBottomWidth: amountBorderWidth },
                        ]}
                    >
                        <Text style={styles.label}>Payment Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter payment amount"
                            placeholderTextColor="#777"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            onFocus={() => handleFocus("amount")}
                            onBlur={() => handleBlur("amount")}
                        />
                    </Animated.View>

                    {/* Dropdown Picker */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select Category</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedCategory}
                                style={styles.picker}
                                dropdownIconColor="white"
                                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            >
                                <Picker.Item label="Personal Loan" value="Personal Loan" />
                                <Picker.Item label="Student Loans" value="Student Loans" />
                                <Picker.Item label="Car Loans" value="Car Loans" />
                                <Picker.Item label="Mortgage" value="Mortgage" />
                                <Picker.Item label="Credit Cards" value="Credit Card Loans" />
                            </Picker>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => onSubmit(parseFloat(amount), selectedCategory)}
                        >
                            <Text style={styles.confirmText}>Submit Payment</Text>
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
    inputContainer: {
        borderBottomWidth: 0,
        padding: 8,
        borderRadius: 8,
        marginBottom: 15,
    },
    input: {
        fontSize: 20,
        color: "#fff",
    },
    label: {
        fontSize: 16,
        color: "#aaa",
        marginBottom: 5,
        fontFamily: Theme.CFL_primary_font,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#999",
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
        width: "100%",
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
        color: Theme.CFL_white,
        fontWeight: "bold",
        fontFamily: Theme.CFL_primary_font,
    },
    confirmText: {
        color: Theme.CFL_white,
        fontWeight: "bold",
        fontFamily: Theme.CFL_primary_font,
    },
});

export default PaymentDialog;
