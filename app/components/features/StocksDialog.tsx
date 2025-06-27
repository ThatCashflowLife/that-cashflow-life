import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Theme from "../../../interfaces/theme";

interface Props {
    isVisible: boolean;
    onSubmit: (
        symbol: string,
        shares: number,
        pricePerShare: number,
        type: "deposit" | "withdrawal"
    ) => void;
    onCancel: () => void;
}

const StocksDialog: React.FC<Props> = ({ isVisible, onSubmit, onCancel }) => {
    const [symbol, setSymbol] = useState("");
    const [shares, setShares] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState<"deposit" | "withdrawal">("deposit");

    const handleSubmit = () => {
        const parsedShares = parseFloat(shares);
        const parsedPrice = parseFloat(price);
        const trimmedSymbol = symbol.trim().toUpperCase();

        if (!trimmedSymbol) {
            Alert.alert("Missing Symbol", "Please enter a valid stock symbol.");
            return;
        }

        if (isNaN(parsedShares) || parsedShares <= 0) {
            Alert.alert("Invalid Shares", "Please enter a number greater than 0 for shares.");
            return;
        }

        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Alert.alert("Invalid Price", "Please enter a valid price per share.");
            return;
        }

        onSubmit(trimmedSymbol, parsedShares, parsedPrice, type);
        setSymbol("");
        setShares("");
        setPrice("");
        setType("deposit");
    };

    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Manage Stocks</Text>

                    <TextInput
                        placeholder="Stock Symbol (e.g. AAPL)"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        value={symbol}
                        onChangeText={setSymbol}
                        autoCapitalize="characters"
                    />

                    <TextInput
                        placeholder="Number of Shares"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        style={styles.input}
                        value={shares}
                        onChangeText={setShares}
                    />

                    <TextInput
                        placeholder="Price per Share"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.toggle, type === "deposit" && styles.selected]}
                            onPress={() => setType("deposit")}
                        >
                            <Text style={styles.toggleText}>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggle, type === "withdrawal" && styles.selected]}
                            onPress={() => setType("withdrawal")}
                        >
                            <Text style={styles.toggleText}>Sell</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.cancel} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Apply</Text>
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
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    dialog: {
        width: "85%",
        backgroundColor: "#282828",
        borderRadius: 20,
        padding: 20,
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
        marginBottom: 12,
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
        borderRadius: 50,
        marginHorizontal: 5,
        alignItems: "center",
    },
    selected: {
        backgroundColor: "#000",
        borderBottomColor: Theme.CFL_green,
        borderBottomWidth:2
    },
    toggleText: {
        color: "#fff",
        fontWeight: "bold",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    cancel: {
        marginRight: 15,
        backgroundColor: Theme.CFL_red,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
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
    },
    submitText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default StocksDialog;
