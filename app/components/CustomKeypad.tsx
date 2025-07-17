// CustomKeypad.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "../../interfaces/theme";

interface KeypadProps {
    onPress: (value: string) => void;
}

const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["-", "0", "←"],
];

const CustomKeypad: React.FC<KeypadProps> = ({ onPress }) => {
    return (
        <View style={styles.container}>
            {keys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.key}
                            onPress={() => onPress(key)}
                        >
                            <Text style={styles.keyText}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding:10,
        backgroundColor: "#000",
        borderRadius: 10,
        marginTop: 0,
        marginHorizontal:-20,
        borderTopWidth: 2,
        borderColor:"#ccc"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 5,
        gap:15
    },
    key: {
        backgroundColor: "#444",
        paddingVertical: "1%",
        paddingHorizontal: "10%",
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
    },
    keyText: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold",
    },
});

export default CustomKeypad;
