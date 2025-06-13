// TabLayout.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Theme from "../interfaces/theme";
import { useTransactions } from "./components/context/TransactionProvider";
import { useUser } from "./components/context/UserProvider";
import Header from "./components/Header/Header";
import ScannerButton from "./components/QrCodeScanner/ScannerButton";
import LoanDialog from "./components/features/LoanDialog";
import PaymentDialog from "./components/features/PaymentDialog";
import DealDialog from "./components/features/DealDialog";
import {
    createProfessionTransaction,
    populateFirstProfession,
    populateLaterProfession,
    addChildToUser,
    createBabyTransaction,
    addLoanToUser,
    createLoanTransaction,
    createPaymentTransaction,
    applyPaymentToLoan,
    createDealTransaction,
    applyDealToUser,createSavingsTransaction
} from "./components/QrCodeScanner/ScannerLogic";
import { LoanCategory, PassiveIncomeCategory } from "./components/QrCodeScanner/ScannerLogic";
import { QRData } from "../interfaces/qrTypes";
import { calculateNetWorth } from "./components/UserFinances/FinancialOverview";
import Profession from "../interfaces/Profession";
import Transaction from "../interfaces/Transaction";
import SavingsDialog from "./components/features/SavingsDialog";

const DynamicTabs = () => {
    const { user } = useUser();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Theme.CFL_dark_text,
                tabBarActiveBackgroundColor: Theme.CFL_green,
                tabBarInactiveTintColor: Theme.CFL_white,
                tabBarInactiveBackgroundColor: "rgba(255,255,255,0.1)",
                tabBarIconStyle: { width: 24, height: 24, marginTop: 5 },
                tabBarStyle: styles.tabBar,
                tabBarAllowFontScaling: true,
                tabBarItemStyle: {
                    flex: 1,
                    width: "25%",
                    height: 65,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: user.profession ? `Home` : "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                    tabBarLabelStyle: styles.tabLabel,
                }}
            />
            <Tabs.Screen
                name="finances"
                options={{
                    tabBarLabel: "Finances",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="attach-money" size={size} color={color} />
                    ),
                    tabBarLabelStyle: styles.tabLabel,
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    tabBarLabel: "Transactions",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="receipt" size={size} color={color} />
                    ),
                    tabBarLabelStyle: styles.tabLabel,
                }}
            />
            <Tabs.Screen
                name="assets"
                options={{
                    tabBarLabel: "Properties",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="apartment" size={size} color={color} />
                    ),
                    tabBarLabelStyle: styles.tabLabel,
                }}
            />
        </Tabs>
    );
};

export const TabLayout = () => {
    const { user, setUser } = useUser();
    const { addTransactions } = useTransactions();
    const [isLoanDialogVisible, setIsLoanDialogVisible] = useState(false);
    const [isPaymentDialogVisible, setIsPaymentDialogVisible] = useState(false);
    const [isDealDialogVisible, setIsDealDialogVisible] = useState(false);
    const [isSavingsDialogVisible, setIsSavingsDialogVisible] = useState(false);

    const handleScan = (data: QRData) => {
        function isProfession(data: QRData): data is Profession {
            return (data as Profession).income !== undefined && (data as Profession).expenses !== undefined;
        }

        function isTransaction(data: QRData): data is Transaction {
            return (data as Transaction).type !== undefined && (data as Transaction).amount !== undefined;
        }

        console.log('📦 Scanned Data:', data);

        if (isProfession(data)) {
            const professionData = data;

            if (user.profession === "Profession" || user.profession === "") {
                const updatedUser = populateFirstProfession(professionData, user);
                setUser(updatedUser);
                calculateNetWorth(updatedUser, setUser);
            } else {
                const updatedUser = populateLaterProfession(professionData, user);
                setUser(updatedUser);
            }

            const newJobTransaction = createProfessionTransaction(professionData);
            addTransactions([newJobTransaction]);
        }
        else if (isTransaction(data)) {
            if (data.name === "New Baby") {
                const updatedUser = addChildToUser(user);
                const babyTransaction = createBabyTransaction(user);
                setUser(updatedUser);
                addTransactions([babyTransaction]);
            }
            else if (data.name === "New Loan" && data.loanDetails) {
                const updatedUser = addLoanToUser(user, data.loanDetails);
                const loanTransaction = createLoanTransaction(data.loanDetails);
                setUser(updatedUser);
                addTransactions([loanTransaction]);
            }
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Header />

                <View style={styles.fabContainer}>
                    <ScannerButton onScan={handleScan} buttonStyle={styles.fab} iconSize={38} />
                    <TouchableOpacity style={styles.fab} onPress={() => setIsLoanDialogVisible(true)}>
                        <MaterialIcons name="attach-money" size={48} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab} onPress={() => setIsPaymentDialogVisible(true)}>
                        <MaterialIcons name="payment" size={40} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab} onPress={() => setIsDealDialogVisible(true)}>
                        <MaterialIcons name="handshake" size={48} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab} onPress={() => setIsSavingsDialogVisible(true)}>
                        <MaterialIcons name="savings" size={48} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* 🧩 CALL DynamicTabs */}
                <DynamicTabs />
            </SafeAreaView>

            {/* Dialogs */}
            <LoanDialog
                isVisible={isLoanDialogVisible}
                onSubmit={(loanAmount: number, paymentAmount: number, purpose: string) => {
                    const updatedUser = addLoanToUser(user, {
                        amount: loanAmount,
                        payment: paymentAmount,
                        purpose,
                    });

                    const loanTransaction = createLoanTransaction({
                        amount: loanAmount,
                        payment: paymentAmount,
                        purpose,
                    });

                    setUser(updatedUser);
                    addTransactions([loanTransaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsLoanDialogVisible(false);
                }}
                onCancel={() => setIsLoanDialogVisible(false)}
            />
            <PaymentDialog
                isVisible={isPaymentDialogVisible}
                onSubmit={(paymentAmount: number, selectedCategory: LoanCategory) => {
                    const updatedUser = applyPaymentToLoan(user, paymentAmount, selectedCategory);
                    const paymentTransaction = createPaymentTransaction(paymentAmount, selectedCategory);

                    setUser(updatedUser);
                    addTransactions([paymentTransaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsPaymentDialogVisible(false);
                }}
                onCancel={() => setIsPaymentDialogVisible(false)}
            />
            <DealDialog
                isVisible={isDealDialogVisible}
                onSubmit={(cashflow: number, mortgage: number, incomeType: PassiveIncomeCategory) => {
                    const updatedUser = applyDealToUser(user, cashflow, mortgage, incomeType);
                    const dealTransaction = createDealTransaction(cashflow, mortgage, incomeType);

                    setUser(updatedUser);
                    addTransactions([dealTransaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsDealDialogVisible(false);
                }}
                onCancel={() => setIsDealDialogVisible(false)}
            />
            <SavingsDialog
                isVisible={isSavingsDialogVisible}
                onCancel={() => setIsSavingsDialogVisible(false)}
                onSubmit={(amount, type) => {
                    const updatedUser = { ...user };
                    if (!updatedUser.Assets.Savings) updatedUser.Assets.Savings = 0;

                    if (type === "deposit") {
                        updatedUser.Assets.Savings += amount;
                    } else if (type === "withdrawal") {
                        updatedUser.Assets.Savings = Math.max(0, updatedUser.Assets.Savings - amount);
                    }
                    const transaction = createSavingsTransaction(amount, type);
                    
                    
                    setUser(updatedUser);
                    addTransactions([transaction]);

                    calculateNetWorth(updatedUser, setUser);
                    setIsSavingsDialogVisible(false);
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.CFL_app_background,
    },
    tabLabel: {
        fontSize: 12,
        fontFamily: Theme.CFL_primary_font,
        paddingTop: 5,
    },
    tabBar: {
        height: 65,
        backgroundColor: Theme.CFL_app_background,
    },
    fabContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        backgroundColor: "transparent",
        position: "relative",
    },
    fab: {
        width: 68,
        height: 68,
        borderRadius: 35,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
    },
});

export default TabLayout;