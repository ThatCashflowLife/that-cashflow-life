import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,Animated
} from "react-native";
import { RealEstate } from "../../../interfaces/Assets";
import Theme from "../../../interfaces/theme";
import CustomKeypad from "../CustomKeypad";

interface SellPropertyDialogProps {
    isVisible: boolean;
    property: RealEstate | null;
    onCancel: () => void;
    onConfirm: (salePrice: number) => void;
}

const SellPropertyDialog: React.FC<SellPropertyDialogProps> = ({
    isVisible,
    property,
    onCancel,
    onConfirm,
}) => {
    const [salePrice, setSalePrice] = useState("");
    const [amount, setAmount] = useState("");
    const [activeField, setActiveField] = useState(null);

    const handleConfirm = () => {
        const parsedPrice = parseFloat(amount);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Alert.alert("Invalid Price", "Please enter a valid sale price.");
            return;
        }

        onConfirm(parsedPrice);
        setAmount(""); // clear keypad value after confirm
    };

    const handleKeypadPress = (key) => {
        const update = (current) => (key === "←" ? current.slice(0, -1) : current + key);
        if (activeField === "amount") setAmount(update(amount));
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Sell Property</Text>
                    {property && (
                        <>
                            <Text style={styles.label}>Property: {property.name}</Text>
                            
                            <TouchableOpacity onPress={() => { setActiveField("amount");}}>
                                                        <Animated.View style={[styles.inputCont]}>
                                                            <Text style={amount ? styles.input : styles.input}>{amount || "Enter Sale Price"}</Text>
                                                        </Animated.View>
                                                    </TouchableOpacity>

                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
                                    <Text style={styles.confirmText}>Confirm Sale</Text>
                                </TouchableOpacity>
                            </View>

                            <CustomKeypad onPress={handleKeypadPress} />
                        </>
                    )}
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
    dialog: {
        backgroundColor: "#000",
        borderRadius: 0,
        paddingTop: 10,
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 45,
        fontWeight: "bold",
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        color: "#fff"
    },
    label: { fontSize: 18, color: "#aaa", marginBottom: 5, marginLeft: 15, marginRight: 15 },
    inputCont: { padding: 5, marginBottom: 15, marginLeft: 15, marginRight: 15, borderRadius: 20, borderBottomWidth:2, borderBottomColor:"#ccc" },
    input: { fontSize: 35, color: "#fff", paddingLeft: 5 },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#000",
        marginHorizontal: 15,
        marginTop: "25%",
        marginBottom: "10%"
    },
    cancel: { flex: 1, paddingVertical: 12, backgroundColor: Theme.CFL_danger_button, borderRadius: 8, alignItems: "center", marginRight: 5 },
    confirm: { flex: 3, paddingVertical: 12, backgroundColor: Theme.CFL_green, borderRadius: 8, alignItems: "center", marginLeft: 5 },
    cancelText: { color: "#fff", fontWeight: "bold" },
    confirmText: { color: "#fff", fontWeight: "bold" },
});

export default SellPropertyDialog;
