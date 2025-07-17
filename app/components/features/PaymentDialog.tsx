import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native";
import Theme from "../../../interfaces/theme";
import { RealEstate } from "../../../interfaces/Assets";

interface PaymentDialogProps {
    isVisible: boolean;
    onSubmit: (amount: number, category: string) => void;
    onCancel: () => void;
    liabilities: { [key: string]: any };
    realEstate: RealEstate[];
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
    isVisible,
    onSubmit,
    onCancel,
    liabilities,
    realEstate,
}) => {
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

    const [focusAnim, setFocusAnim] = useState({
        amount: new Animated.Value(0),
    });

    const handleFocus = (field: keyof typeof focusAnim) => {
        Animated.timing(focusAnim[field], { toValue: 1, duration: 300, useNativeDriver: false }).start();
    };

    const handleBlur = (field: keyof typeof focusAnim) => {
        Animated.timing(focusAnim[field], { toValue: 0, duration: 300, useNativeDriver: false }).start();
    };

    const amountBorderColor = focusAnim.amount.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ccc", Theme.CFL_green],
    });
    const amountBorderWidth = focusAnim.amount.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 5],
    });

    // Combined list of categories
    const categoryKeys = [
        ...Object.keys(liabilities),
        ...(realEstate.length > 0 ? ["Real Estate"] : []),
    ];

    const selectedLiabilityAmount =
        selectedCategory === "Real Estate" && selectedLoan
            ? realEstate.find(p => p.name === selectedLoan)?.Mortgage ?? 0
            : (selectedCategory && typeof liabilities[selectedCategory] === "number"
                ? liabilities[selectedCategory]
                : selectedLoan && selectedCategory
                    ? liabilities[selectedCategory][selectedLoan]
                    : 0);

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Submit a Payment</Text>

                    <Animated.View style={[styles.inputContainer, { borderColor: amountBorderColor, borderBottomWidth: amountBorderWidth }]}>
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

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select Category</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.incomePillsContainer}>
                            {categoryKeys.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[styles.incomePill, selectedCategory === category && styles.incomePillSelected]}
                                    onPress={() => {
                                        setSelectedCategory(category);
                                        setSelectedLoan(null); // reset loan selection when switching category
                                    }}
                                >
                                    <Text style={[styles.incomePillText, selectedCategory === category && styles.incomePillTextSelected]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {selectedCategory && selectedCategory !== "Real Estate" && typeof liabilities[selectedCategory] === "object" && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.incomePillsContainer} style={{ marginTop: 10 }}>
                                {Object.entries(liabilities[selectedCategory]).map(([loanName, amount]) => (
                                    <TouchableOpacity
                                        key={loanName}
                                        style={[styles.incomePill, selectedLoan === loanName && styles.incomePillSelected]}
                                        onPress={() => setSelectedLoan(loanName)}
                                    >
                                        <Text style={[styles.incomePillText, selectedLoan === loanName && styles.incomePillTextSelected]}>
                                            {loanName} 
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        {selectedCategory === "Real Estate" && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.incomePillsContainer} style={{ marginTop: 10 }}>
                                {realEstate.map((property, idx) => (
                                    <TouchableOpacity
                                        key={property.name || idx}
                                        style={[styles.incomePill, selectedLoan === property.name && styles.incomePillSelected]}
                                        onPress={() => setSelectedLoan(property.name)}
                                    >
                                        <Text style={[styles.incomePillText, selectedLoan === property.name && styles.incomePillTextSelected]}>
                                            {property.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        {selectedCategory && selectedLiabilityAmount > 0 && (
                            <Text style={styles.remainingText}>
                                Remaining Balance: ${selectedLiabilityAmount.toFixed(2)}
                            </Text>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => {
                                const categoryToUse = selectedLoan
                                    ? `${selectedCategory}: ${selectedLoan}`
                                    : selectedCategory;
                                onSubmit(parseFloat(amount), categoryToUse!);
                            }}
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
    overlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.9)", padding: 20 },
    container: { backgroundColor: "#222", borderRadius: 10, padding: 20 },
    title: { fontSize: 25, fontWeight: "bold", marginBottom: 15, color: "#fff" },
    inputContainer: { padding: 8, borderRadius: 8, marginBottom: 15 },
    input: { fontSize: 20, color: "#fff" },
    label: { fontSize: 16, color: "#aaa", marginBottom: 5, fontFamily: Theme.CFL_primary_font },
    incomePillsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
    incomePill: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#444", borderRadius: 25, margin: 4 },
    incomePillSelected: { backgroundColor: "#000", borderBottomColor: Theme.CFL_green, borderBottomWidth: 2 },
    incomePillText: { color: "#fff", fontFamily: Theme.CFL_primary_font },
    incomePillTextSelected: { color: "#fff" },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 25 },
    cancelButton: { flex: 1, paddingVertical: 12, backgroundColor: Theme.CFL_danger_button, borderRadius: 8, alignItems: "center", marginRight: 5 },
    confirmButton: { flex: 3, paddingVertical: 12, backgroundColor: Theme.CFL_green, borderRadius: 8, alignItems: "center", marginLeft: 5 },
    cancelText: { color: Theme.CFL_white, fontWeight: "bold", fontFamily: Theme.CFL_primary_font },
    confirmText: { color: Theme.CFL_white, fontWeight: "bold", fontFamily: Theme.CFL_primary_font },
    remainingText: { color: "#aaa", fontSize: 16, marginTop: 10, fontFamily: Theme.CFL_primary_font },
});

export default PaymentDialog;
