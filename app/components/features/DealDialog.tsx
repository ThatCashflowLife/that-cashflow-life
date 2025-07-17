import React, { useState, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, Animated, Easing, StyleSheet, ScrollView } from "react-native";
import Theme from "../../../interfaces/theme";
import CustomKeypad from "../CustomKeypad";
import { RealEstate } from "../../../interfaces/Assets";

const DealDialog = ({ isVisible, onSubmit, onCancel }) => {
    const [cashflow, setCashflow] = useState("");
    const [mortgage, setMortgage] = useState("");
    const [saleRange, setSaleRange] = useState("");
    const [incomeType, setIncomeType] = useState("Real Estate Income");
    const [propertyType, setPropertyType] = useState("");

    const incomeOptions = [
        "Real Estate Income",
        "Dividends",
        "Business Income",
        "Interest",
    ];

    const propertyOptions = [
        "3Br/2Ba House",
        "Duplex",
        "4-Plex",
        "8-Plex",
        "Apartment Complex",
        "Business",
    ];

    const [activeField, setActiveField] = useState(null);
    const [error, setError] = useState("");

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-20)).current;
    const cashflowAnim = useRef(new Animated.Value(0)).current;
    const mortgageAnim = useRef(new Animated.Value(0)).current;
    const saleRangeAnim = useRef(new Animated.Value(0)).current;

    const handleKeypadPress = (key) => {
        const update = (current) => (key === "←" ? current.slice(0, -1) : current + key);
        if (activeField === "cashflow") setCashflow(update(cashflow));
        else if (activeField === "mortgage") setMortgage(update(mortgage));
        else if (activeField === "saleRange") setSaleRange(update(saleRange));
    };

    const handleSubmit = () => {
        if (cashflow.trim() === "" || mortgage.trim() === "") {
            showError("Please fill in all fields.");
            return;
        }
        if (incomeType === "Real Estate Income" && propertyType === "") {
            showError("Please select a property type.");
            return;
        }
        if (incomeType === "Real Estate Income" && saleRange.trim() === "") {
            showError("Please enter a sale range.");
            return;
        }
        const cf = parseFloat(cashflow);
        const mg = parseFloat(mortgage);
        if (isNaN(cf) || isNaN(mg)) {
            showError("Please enter valid numbers.");
            return;
        }
        setError("");
        const finalType = incomeType === "Real Estate Income" && propertyType
            ? `${incomeType}: ${propertyType}`
            : incomeType;
       

        onSubmit(cf, mg, incomeType, propertyType, saleRange);

              


    };

    const showError = (msg) => {
        setError(msg);
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: -20, duration: 300, useNativeDriver: true }),
            ]).start(() => setError(""));
        }, 3000);
    };

    const animateBorders = (field) => {
        Animated.timing(cashflowAnim, { toValue: field === "cashflow" ? 1 : 0, duration: 250, useNativeDriver: false, easing: Easing.out(Easing.ease) }).start();
        Animated.timing(mortgageAnim, { toValue: field === "mortgage" ? 1 : 0, duration: 250, useNativeDriver: false, easing: Easing.out(Easing.ease) }).start();
        Animated.timing(saleRangeAnim, { toValue: field === "saleRange" ? 1 : 0, duration: 250, useNativeDriver: false, easing: Easing.out(Easing.ease) }).start();
    };

    const cashflowBorderColor = cashflowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ccc", Theme.CFL_green],
    });
    const cashflowBorderWidth = cashflowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });
    const mortgageBorderColor = mortgageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ccc", Theme.CFL_green],
    });
    const mortgageBorderWidth = mortgageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });
    const saleRangeBorderColor = saleRangeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#ccc", Theme.CFL_green],
    });
    const saleRangeBorderWidth = saleRangeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add Deal</Text>

                    <Text style={styles.label}>Monthly Cashflow</Text>
                    <TouchableOpacity onPress={() => { setActiveField("cashflow"); animateBorders("cashflow"); }}>
                        <Animated.View style={[styles.inputBox, { borderColor: cashflowBorderColor, borderBottomWidth: cashflowBorderWidth }]}>
                            <Text style={cashflow ? styles.inputText : styles.inputPlaceholder}>{cashflow || "Enter monthly cashflow"}</Text>
                        </Animated.View>
                    </TouchableOpacity>

                    <Text style={styles.label}>Mortgage Amount</Text>
                    <TouchableOpacity onPress={() => { setActiveField("mortgage"); animateBorders("mortgage"); }}>
                        <Animated.View style={[styles.inputBox, { borderColor: mortgageBorderColor, borderBottomWidth: mortgageBorderWidth }]}>
                            <Text style={mortgage ? styles.inputText : styles.inputPlaceholder}>{mortgage || "Enter mortgage amount"}</Text>
                        </Animated.View>
                    </TouchableOpacity>

                    {incomeType === "Real Estate Income" && (
                        <>
                            <Text style={styles.label}>Estimated Sale Range</Text>
                            <TouchableOpacity onPress={() => { setActiveField("saleRange"); animateBorders("saleRange"); }}>
                                <Animated.View style={[styles.inputBox, { borderColor: saleRangeBorderColor, borderBottomWidth: saleRangeBorderWidth }]}>
                                    <Text style={saleRange ? styles.inputText : styles.inputPlaceholder}>{saleRange || "Enter estimated sale range"}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </>
                    )}

                    <Text style={styles.label}>Income Type</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.incomePillsContainer}>
                        {incomeOptions.map((type) => (
                            <TouchableOpacity key={type} style={[styles.incomePill, incomeType === type && styles.incomePillSelected]} onPress={() => setIncomeType(type)}>
                                <Text style={[styles.incomePillText, incomeType === type && styles.incomePillTextSelected]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {incomeType === "Real Estate Income" && (
                        <>
                            <Text style={[styles.label, { marginTop: 10 }]}>Property Type</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.incomePillsContainer}>
                                {propertyOptions.map((type) => (
                                    <TouchableOpacity key={type} style={[styles.incomePill, propertyType === type && styles.incomePillSelected]} onPress={() => setPropertyType(type)}>
                                        <Text style={[styles.incomePillText, propertyType === type && styles.incomePillTextSelected]}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                    )}

                    {error !== "" && (
                        <Animated.View style={[styles.messageContainer, styles.errorMessage, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                            <Text style={styles.errorText}>{error}</Text>
                        </Animated.View>
                    )}

                    
                </View>
                <CustomKeypad onPress={handleKeypadPress} />
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                            <Text style={styles.confirmText}>Add Deal</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,1)",
        paddingHorizontal: 0
    },
    container: {
        backgroundColor: "#222",
        borderRadius: 0,
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#fff"
    },
    label: { fontSize: 12, color: "#aaa", marginBottom: 5 },
    inputBox: { padding: 8, marginBottom: 15 },
    inputText: { fontSize: 15, color: "#fff" },
    inputPlaceholder: { fontSize: 15, color: "#aaa" },
    incomePillsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", marginTop: 10 },
    incomePill: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#444", borderRadius: 25, marginVertical: 4, marginHorizontal: 4 },
    incomePillSelected: { backgroundColor: "#000", borderBottomColor: Theme.CFL_green, borderBottomWidth: 2 },
    incomePillText: { color: "#fff", fontFamily: Theme.CFL_primary_font },
    incomePillTextSelected: { color: "#fff" },
    messageContainer: { width: "100%", padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 10, alignSelf: "center" },
    errorMessage: { backgroundColor: "#f8d7da" },
    errorText: { color: "#721c24", textAlign: "center", fontSize: 14 },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor:"#000",
        margin: 15
    },
    cancelButton: { flex: 1, paddingVertical: 12, backgroundColor: Theme.CFL_danger_button, borderRadius: 8, alignItems: "center", marginRight: 5 },
    confirmButton: { flex: 3, paddingVertical: 12, backgroundColor: Theme.CFL_green, borderRadius: 8, alignItems: "center", marginLeft: 5 },
    cancelText: { color: "#fff", fontWeight: "bold" },
    confirmText: { color: "#fff", fontWeight: "bold" },
});

export default DealDialog;
