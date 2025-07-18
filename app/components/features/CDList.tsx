import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { CertificateOfDeposit } from "../../../interfaces/Assets";
import Theme from "../../../interfaces/theme";

interface Props {
    cds: CertificateOfDeposit[];
}

const CDList: React.FC<Props> = ({ cds }) => {
    if (!cds || cds.length === 0) {
        return <View style={styles.emptyContainer}>

            <Text style={styles.empty}>Certificates of Deposits will be shown here</Text>
            <View style={styles.separator} />
            <Text style={styles.empty2}>No CDs have been bought yet</Text>
        </View>;
    }

    return (
        <View style={styles.main}>
            <Text style={styles.label}>Certificates of Deposit:</Text>
            <ScrollView style={styles.scroll} nestedScrollEnabled>
                
            {cds.map((item, index) => (
                <View style={styles.card} key={`${item.name}-${index}`}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.info}>Amount: ${item.amount.toLocaleString()}</Text>
                    <Text style={styles.info}>APR: {item.interestRate}%</Text>
                    <Text style={styles.info}>Term: {item.termMonths} months</Text>
                    <Text style={styles.info}>Start: {new Date(item.startDate).toLocaleDateString()}</Text>
                    <Text style={styles.info}>Matures: {new Date(item.maturityDate).toLocaleDateString()}</Text>
                </View>
            ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        height: 250,
    },
    scroll: {
        flex: 1,
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "#00c853",
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00c853",
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 2,
    },
    label: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 8,
    },
    emptyContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "#00c853",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        height: 200,
    },
    empty: {
        color: "#ccc",
        fontStyle: "italic",
        fontSize: 16,
        width: "100%",
        textAlign: "center",
        marginTop: "5%",
        marginBottom: "5%"
    },
    empty2: {
        color: "#ccc",
        fontStyle: "italic",
        fontSize: 16,
        width: "100%",
        textAlign: "center",
        marginTop: "15%",
    },
    separator: {
        height: 1,
        backgroundColor: Theme.CFL_gray,
    },
});

export default CDList;
