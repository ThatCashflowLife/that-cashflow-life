import React, { useState, useRef } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from "react-native";
import Theme from "../../../interfaces/theme";
import { CertificateOfDeposit } from "../../../interfaces/Assets";
import CustomKeypad from "../CustomKeypad";

interface Props {
    isVisible: boolean;
    onSubmit: (cd: CertificateOfDeposit) => void;
    onCancel: () => void;
}

const CertificateDialog: React.FC<Props> = ({ isVisible, onSubmit, onCancel }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [termMonths, setTermMonths] = useState("");

    const now = new Date();
    const startDate = now.toISOString();
    const maturityDate = new Date(now.setMonth(now.getMonth() + Number(termMonths))).toISOString();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-20)).current;
    const cashflowAnim = useRef(new Animated.Value(0)).current;
    const mortgageAnim = useRef(new Animated.Value(0)).current;
    const saleRangeAnim = useRef(new Animated.Value(0)).current;
    const handleAdd = () => {
        const cd: CertificateOfDeposit = {
            name: name,
            amount: parseFloat(amount),
            interestRate: parseFloat(interestRate),
            termMonths: parseInt(termMonths),
            startDate: startDate,
            maturityDate: maturityDate,
        };
        onSubmit(cd);
    };
    const handleKeypadPress = (key) => {
        const update = (current) => (key === "←" ? current.slice(0, -1) : current + key);
        if (activeField === "amount") setAmount(update(amount));
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
                <View style={styles.dialog}>
                    <Text style={styles.title}>Add Certificate of Deposit</Text>

                    {[
                        { label: "Name", value: name, setter: setName },
                        { label: "Amount", value: amount, setter: setAmount, keyboard: "numeric" },
                        { label: "Interest Rate (%)", value: interestRate, setter: setInterestRate, keyboard: "numeric" },
                        { label: "Term (months)", value: termMonths, setter: setTermMonths, keyboard: "numeric" },
                    ].map(({ label, value, setter, keyboard }, idx) => (
                        <View key={idx} style={styles.inputContainer}>
                            <Text style={styles.label}>{label}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                value={value}
                                onChangeText={setter}
                                keyboardType={keyboard || "default"}
                                placeholderTextColor="#777"
                            />
                        </View>
                    ))}


                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submit} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Add CD</Text>
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
        backgroundColor: "rgba(255,0,0,1)",
        justifyContent: "center",
        alignItems: "center",
    },
    dialog: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,1)",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: Theme.CFL_primary_font,
        marginBottom: 15,
        color: "#fff",
    },
    inputContainer: { padding: 8, marginBottom: 5, borderRadius: 50 },
    inputText: { fontSize: 19, color: "#fff", paddingLeft: 15 },
    inputPlaceholder: { fontSize: 17, color: "#aaa", paddingLeft: 15 },
    label: { color: "#aaa", fontSize: 14, marginBottom: 5 },
    input: { color: "#fff", fontSize: 16, borderBottomWidth: 1, borderColor: "#555", paddingBottom: 5 },
    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 10,
    },
    cancel: {
        marginRight: 15,
        backgroundColor: Theme.CFL_red,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        flex: 1,
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
        flex: 3,
    },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default CertificateDialog;
