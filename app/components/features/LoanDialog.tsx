import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Theme from "../../../interfaces/theme";

const LoanDialog = ({ isVisible, onSubmit, onCancel }) => {
    const [amount, setAmount] = useState("");
    const [payment, setPayment] = useState("");
    const [purpose, setPurpose] = useState("");
    const [isAmountFocused, setIsAmountFocused] = useState(false);
    const [isPurposeFocused, setIsPurposeFocused] = useState(false);
    
    const [focusAnim, setFocusAnim] = useState({
        loan: new Animated.Value(0),
        purpose: new Animated.Value(0),
    });
      


    // Function to auto-calculate payment
    const handleAmountChange = (text: string) => {
        setAmount(text);

        const parsedAmount = parseFloat(text);
        if (!isNaN(parsedAmount)) {
            const calculatedPayment = (parsedAmount / 10).toFixed(2); // Simple 10% rule
            setPayment(calculatedPayment);
        } else {
            setPayment(""); // Clear payment if invalid input
        }
    };
    
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
     //change loan amount border-color and width 
    const loanBorderColor = focusAnim.loan.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ccc", Theme.CFL_green],
    });
    const loanBorderWidth = focusAnim.loan.interpolate({
        inputRange: [0, 1],
        outputRange: [1,5],
    });

    //change loan purpose border-color and width 
    const purposeBorderColor = focusAnim.purpose.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ccc", Theme.CFL_green],
    });

    const purposeBorderWidth = focusAnim.purpose.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 5],
    });
      
      
    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Loan Details</Text>

                    
                    <Animated.View style={[styles.inputContainer, { borderColor: loanBorderColor }, { borderBottomWidth: loanBorderWidth }]}>

                        <Text style={styles.label}>Loan Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Loan Amount"
                            placeholderTextColor="#777"
                            keyboardType="numeric"
                            onChangeText={handleAmountChange}
                            onFocus={() => handleFocus('loan')}
                            onBlur={() => handleBlur('loan')}
                        
                        />
                    </Animated.View>


                    
                    <Text style={styles.label}>Monthly Payment</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Automatically Calculated"
                        placeholderTextColor="#777"
                        keyboardType="numeric"
                        value={payment}
                        editable={false}
                        />
                    

                    <Animated.View style={[styles.inputContainer, { borderColor:purposeBorderColor }, {borderBottomWidth:purposeBorderWidth}]}>
                    <Text style={styles.label}>Purpose</Text>
                    <TextInput
                        style={
                            styles.input
                        }
                        placeholder="Enter purpose"
                        placeholderTextColor="#777"
                        value={purpose}
                            onChangeText={setPurpose}
                            onFocus={() => handleFocus('purpose')}
                            onBlur={() => handleBlur('purpose')}
                    /></Animated.View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => onSubmit(parseFloat(amount), parseFloat(payment), purpose)}>
                            <Text style={styles.confirmText}>Add Loan</Text>
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
        borderBottomWidth: 1,
        padding: 8,
        borderRadius: 8,
        marginBottom: 15,
    },

    input: {
        fontSize: 20,
        color: "#fff",
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
    //input label
    label: {
        fontSize: 16,
        color: "#aaa",
        marginBottom: 5,
        marginTop: 10,
        fontFamily: Theme.CFL_primary_font,
    },
      
});

export default LoanDialog;
