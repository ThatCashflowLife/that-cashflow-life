import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Theme from "../../../interfaces/theme";
interface PaymentDialogProps {
    isVisible: boolean;
    onSubmit: (amount: number, category: string) => void;
    onCancel: () => void;
    liabilities: { [key: string]: number };
}


const PaymentDialog: React.FC<PaymentDialogProps> = ({
    isVisible,
    onSubmit,
    onCancel,
    liabilities,
}) => {

    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Personal Loan");

    const [paymentType, setPaymentType] = useState("Personal Loan");
    const remainingAmount = liabilities[selectedCategory] ?? 0;

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

                    {/* Liabilities List */}

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select Category</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.incomePillsContainer}
                        >
                            {Object.entries(liabilities).map(([key, value]) => (
                                <TouchableOpacity
                                    key={key}
                                    style={[
                                        styles.incomePill,
                                        selectedCategory === key && styles.incomePillSelected,
                                    ]}
                                    onPress={() => setSelectedCategory(key)}
                                >
                                    <Text
                                        style={[
                                            styles.incomePillText,
                                            selectedCategory === key && styles.incomePillTextSelected,
                                        ]}
                                    >
                                        {key}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.remainingText}>
                            Remaining Balance: ${remainingAmount.toFixed(2)}
                        </Text>

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
        backgroundColor: "#000",
        borderRadius: 50,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: {
        color: "#999",
    },
    incomePillsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    incomePill: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#444",
        borderRadius: 25,
        marginVertical: 4,
        marginHorizontal: 4,
    },
    incomePillSelected: {
        backgroundColor: "#000",
        borderBottomColor: Theme.CFL_green,
        borderBottomWidth: 2
    },
    incomePillText: {
        color: "#fff",
        fontFamily: Theme.CFL_primary_font,
    },
    incomePillTextSelected: {
        color: "#fff",
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
        flex: 3,
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
    remainingText: {
        color: "#aaa",
        fontSize: 16,
        marginTop: 10,
        fontFamily: Theme.CFL_primary_font,
    },

});

export default PaymentDialog;
