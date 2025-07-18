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
                            <Text style={[styles.toggleText, type === "deposit" && styles.selectedText]}>
                                Buy
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.toggle, type === "withdrawal" && styles.selected]}
                            onPress={() => setType("withdrawal")}
                        >
                            <Text style={[styles.toggleText, type === "withdrawal" && styles.selectedText]}>
                                Sell
                            </Text>
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        color: "#fff"
    },
    input: {
        padding: 5,
        marginBottom: 25,
        marginLeft: 15,
        marginRight: 15,
        borderRadius:25,
        borderBottomColor: "#bbb",
        borderBottomWidth: 2 
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
        backgroundColor: "rgba(40,55,40,1)",
        borderBottomColor: Theme.CFL_green,
        borderBottomWidth: 4,
        borderTopColor: Theme.CFL_light_gray,
        borderTopWidth: 0.5,
        borderLeftColor: Theme.CFL_light_gray,
        borderLeftWidth: 0.5,
        borderRightColor: Theme.CFL_light_gray,
        borderRightWidth: 0.5
    },
    toggleText: {
        fontWeight: "bold",
        color: "#bbb",
        fontFamily: Theme.CFL_primary_font 
    },
    selectedText: {
        color: "#fff" 
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#000",
        marginHorizontal: 15,
        marginTop: "15%",
        marginBottom: "10%"
    },
    cancel: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: Theme.CFL_danger_button,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 5
    },
    submit: {
        flex: 3,
        paddingVertical: 12,
        backgroundColor: Theme.CFL_green,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 5
    },
    cancelText: {
        color: "#fff",
        fontWeight: "bold"
    },
    submitText: {
        color: "#fff",
        fontWeight: "bold"
    },
});

export default StocksDialog;
