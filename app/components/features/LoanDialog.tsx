import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "../../../interfaces/theme";

const LoanDialog = ({ isVisible, onSubmit, onCancel }) => {
    const [amount, setAmount] = useState("");
    const [payment, setPayment] = useState("");
    const [purpose, setPurpose] = useState("");

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Loan Details</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Loan Amount"
                        placeholderTextColor="#777"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Monthly Payment"
                        placeholderTextColor="#777"
                        keyboardType="numeric"
                        value={payment}
                        onChangeText={setPayment}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Purpose"
                        placeholderTextColor="#777"
                        value={purpose}
                        onChangeText={setPurpose}
                    />

                    <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                                  <Text style={styles.cancelText}>{"Cancel"}</Text>
                                </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => {
                                const parsedAmount = parseFloat(amount);
                                const parsedPayment = parseFloat(payment);

                                if (isNaN(parsedAmount) || isNaN(parsedPayment)) {
                                    alert("Please enter valid numeric values for amount and payment.");
                                    return;
                                }

                                onSubmit(parsedAmount, parsedPayment, purpose.trim());
                            }}
                        >
                            <Text style={styles.confirmText}>{"Add Loan"}</Text>
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
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 15,
        padding: 8,
        color: "#fff",
        fontSize: 20,
    },
    // btn container
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
          width: "100%",
        marginTop:25,
      },
      // cancel btn
      cancelButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: Theme.CFL_danger_button,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 5,
      },
      // confirm btn
      confirmButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: Theme.CFL_green,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 5,
      },
      // cancel btn txt
      cancelText: {
        color: Theme.CFL_white,
        fontWeight: "bold",
        fontFamily: Theme.CFL_primary_font,
      },
      // confirm btn text
      confirmText: {
        color: Theme.CFL_white,
        fontWeight: "bold",
        fontFamily: Theme.CFL_primary_font,
      },
});

export default LoanDialog;
