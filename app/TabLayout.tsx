import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
} from "react-native";
import Theme from "../interfaces/theme";
import { useTransactions } from "./components/context/TransactionProvider";
import { useUser } from "./components/context/UserProvider";
import Header from "./components/Header/Header";
import ScannerModal from "./components/QrCodeScanner/ScannerModal";
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
    applyDealToUser,
    createSavingsTransaction,
    createStockTransaction,
    updateStocks,
    addCertificateOfDeposit,
    createCDTransaction,
} from "./components/QrCodeScanner/ScannerLogic";
import { QRData } from "../interfaces/qrTypes";
import { calculateNetWorth } from "./components/UserFinances/FinancialOverview";
import Profession from "../interfaces/Profession";
import Transaction from "../interfaces/Transaction";
import SavingsDialog from "./components/features/SavingsDialog";
import StocksDialog from "./components/features/StocksDialog";
import CertificateDialog from "./components/features/CertificateDialog";
import SuccessAnimationModal from "./components/features/SuccessAnimationModal"

const DynamicTabs = ({ onScanPress }: { onScanPress: () => void }) => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 10,
                    left: 20,
                    right: 20,
                    height: 75,
                    backgroundColor: "#000",
                    borderRadius: 80,
                    elevation: 3,
                    shadowColor: "rgba(243, 208, 103, 0.9)",
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 1,
                    shadowRadius: 15,
                    marginHorizontal: 10,
                    borderWidth: 0.08
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: Theme.CFL_primary_font,
                    paddingBottom: 1,
                },
                tabBarActiveTintColor: Theme.CFL_dark_green,
                tabBarInactiveTintColor: Theme.CFL_white,
                tabBarIconStyle: {
                    width: 24,
                    height: 24,
                    marginTop: 7,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="finances"
                options={{
                    tabBarLabel: "Finances",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="attach-money" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    tabBarButton: () => (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={styles.qrButtonGlow} />
                            <TouchableOpacity
                                onPress={onScanPress}
                                style={styles.qrButtonContainer}
                            >
                                <MaterialIcons name="qr-code-scanner" size={60} color="rgba(243, 208, 103, 1)" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="transactions"
                options={{
                    tabBarLabel: "History",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="receipt" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="assets"
                options={{
                    tabBarLabel: "Properties",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="apartment" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export const TabLayout = () => {
    const { user, setUser } = useUser();
    const { addTransactions } = useTransactions();
    const [scannerVisible, setScannerVisible] = useState(false);
    const [isLoanDialogVisible, setIsLoanDialogVisible] = useState(false);
    const [isPaymentDialogVisible, setIsPaymentDialogVisible] = useState(false);
    const [isDealDialogVisible, setIsDealDialogVisible] = useState(false);
    const [isSavingsDialogVisible, setIsSavingsDialogVisible] = useState(false);
    const [isCertificateDialogVisible, setIsCertificateDialogVisible] = useState(false);
    const [isStocksDialogVisible, setIsStocksDialogVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Success!");


    const handleScan = (data: QRData) => {
        setScannerVisible(false); // Close scanner

        function isProfession(data: QRData): data is Profession {
            return (
                (data as Profession).income !== undefined &&
                (data as Profession).expenses !== undefined
            );
        }

        function isTransaction(data: QRData): data is Transaction {
            return (
                (data as Transaction).type !== undefined &&
                (data as Transaction).amount !== undefined
            );
        }

        console.log("📦 Scanned Data:", data);
        setSuccessVisible(true);

        if (isProfession(data)) {
            const updatedUser =
                user.profession === "Profession" || user.profession === ""
                    ? populateFirstProfession(data, user)
                    : populateLaterProfession(data, user);

            setUser(updatedUser);
            calculateNetWorth(updatedUser, setUser);
            addTransactions([createProfessionTransaction(data)]);
            setSuccessMessage("New Career Started!");
            setSuccessVisible(true); 
        } else if (isTransaction(data)) {
            if (data.name === "New Baby") {
                const updatedUser = addChildToUser(user);
                setUser(updatedUser);
                addTransactions([createBabyTransaction(user)]);
                setSuccessMessage("Congrats, You're A Parent!");
                setSuccessVisible(true); 
            } else if (data.name === "New Loan" && data.loanDetails) {
                const updatedUser = addLoanToUser(user, data.loanDetails);
                setUser(updatedUser);
                addTransactions([createLoanTransaction(data.loanDetails)]);
                setSuccessMessage("Loan Added!");
                 setSuccessVisible(true); 
            }
        }
    };

    return (
        <View style={styles.MainContainer}>
            <SafeAreaView style={styles.container}>
                <Header />
                <View style={styles.sViewContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.fabContainer}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => setIsLoanDialogVisible(true)}
                        >
                            <MaterialIcons
                                name="attach-money"
                                size={42}
                                color="rgba(243, 208, 103, 1)"
                            />
                            <Text style={styles.fabText}>Borrow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => setIsPaymentDialogVisible(true)}
                        >
                            <MaterialIcons
                                name="payment"
                                size={40}
                                color="rgba(243, 208, 103, 1)"
                            />
                            <Text style={styles.fabText}>Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => setIsDealDialogVisible(true)}
                        >
                            <MaterialIcons
                                name="handshake"
                                size={42}
                                color="rgba(243, 208, 103, 1)"
                            />
                            <Text style={styles.fabText}>Deals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => setIsSavingsDialogVisible(true)}
                        >
                            <MaterialIcons
                                name="savings"
                                size={40}
                                color="rgba(243, 208, 103, 1)"
                            />
                            <Text style={styles.fabText}>Savings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => setIsStocksDialogVisible(true)}
                        >
                            <MaterialCommunityIcons
                                name="finance"
                                size={42}
                                color="rgba(243, 208, 103, 1)"
                            />
                            <Text style={styles.fabText}>Invest</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <DynamicTabs onScanPress={() => setScannerVisible(true)} />
                <ScannerModal
                    visible={scannerVisible}
                    onClose={() => setScannerVisible(false)}
                    onScan={(scan) => handleScan(scan.data)}
                />

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
                    setSuccessMessage("Loan Added!");
                    setSuccessVisible(true);
                }}
                onCancel={() => setIsLoanDialogVisible(false)}
            />
            <PaymentDialog
                isVisible={isPaymentDialogVisible}
                liabilities={user.Liabilities}
                realEstate={user.Assets.Investments?.RealEstate ?? []}
                onSubmit={(paymentAmount: number, selectedCategory: string) => {
                    const updatedUser = applyPaymentToLoan(user, paymentAmount, selectedCategory);
                    const paymentTransaction = createPaymentTransaction(paymentAmount, selectedCategory);
                    setUser(updatedUser);
                    addTransactions([paymentTransaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsPaymentDialogVisible(false);
                    setSuccessMessage("Payment Submitted!");
                    setSuccessVisible(true);
                }}
                onCancel={() => setIsPaymentDialogVisible(false)}
            />
            <DealDialog
                isVisible={isDealDialogVisible}
                onSubmit={(cashflow: number, mortgage: number, incomeType: PassiveIncomeCategory, propertyType: string, saleRange: string) => {
                    const updatedUser = applyDealToUser(user, cashflow, mortgage, incomeType, propertyType, saleRange);
                    const dealTransaction = createDealTransaction(cashflow, mortgage, incomeType);
                    setUser(updatedUser);
                    addTransactions([dealTransaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsDealDialogVisible(false);
                    setSuccessMessage("Deal Added!");
                    setSuccessVisible(true);
                }}
                onCancel={() => setIsDealDialogVisible(false)}
            />
            <SavingsDialog
                isVisible={isSavingsDialogVisible}
                onCancel={() => setIsSavingsDialogVisible(false)}
                user={user}
                onManageCDs={() => {
                    setIsCertificateDialogVisible(true);
                }}
                onSubmit={(amount, type) => {
                    const updatedUser = { ...user };
                    if (!updatedUser.Assets.Savings) updatedUser.Assets.Savings = 0;

                    if (type === "deposit") {
                        updatedUser.Assets.Savings += amount;
                        setSuccessMessage("Deposit was Successful!");
                    } else if (type === "withdrawal") {
                        updatedUser.Assets.Savings = Math.max(0, updatedUser.Assets.Savings - amount);

                        setSuccessMessage("Withdrawal was Successful!");
                    }
                    const transaction = createSavingsTransaction(amount, type);

                    setUser(updatedUser);
                    addTransactions([transaction]);

                    calculateNetWorth(updatedUser, setUser);
                    setIsSavingsDialogVisible(false);
                    setSuccessVisible(true);
                }}
            />
            <StocksDialog
                isVisible={isStocksDialogVisible}
                onCancel={() => setIsStocksDialogVisible(false)}
                onSubmit={(symbol, shares, price, type) => {
                    const updatedUser = updateStocks(user, symbol, shares, price, type);
                    const transaction = createStockTransaction(symbol, shares, price, type);
                    setUser(updatedUser);
                    addTransactions([transaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsStocksDialogVisible(false);
                    setSuccessVisible(true);
                }}
                stocks={
                    user?.Assets?.Investments?.Stocks ?? {
                        totalValue: 0,
                        holdings: {},
                    }
                }
            />


            <CertificateDialog
                isVisible={isCertificateDialogVisible}
                onCancel={() => { setIsCertificateDialogVisible(false); }}
                onSubmit={(cd) => {
                    const updatedUser = addCertificateOfDeposit(user, cd);
                    const transaction = createCDTransaction(
                        cd.name,
                        cd.amount,
                        cd.interestRate,
                        cd.termMonths,
                        cd.startDate,
                        cd.maturityDate
                    );
                    setUser(updatedUser);
                    addTransactions([transaction]);
                    calculateNetWorth(updatedUser, setUser);
                    setIsCertificateDialogVisible(false);
                    setSuccessMessage("Certificate Purchased!");
                    setSuccessVisible(true);
                }}
            />
            <SuccessAnimationModal
                visible={successVisible}
                message={successMessage}
                onFinish={() => setSuccessVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        height: "100%",
        backgroundColor: "black",
    },
    container: {
        height: "100%",
        backgroundColor: "transparent",
    },
    tabLabel: {
        fontSize: 12,
        fontFamily: Theme.CFL_primary_font,
        paddingTop: 10,
    },
    fabContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        height: 100,
        width: "100%"
    },
    fab: {
        width: "29%",
        height: 78,
        borderRadius: 75,
        borderColor: "rgba(243, 208, 103, 0.6)",
        borderWidth: 1,
        backgroundColor: "rgba(255, 215, 0, 0.08)",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2,
        elevation: 12,
        shadowColor: "rgba(243, 208, 103, 0.85)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
    },
    fabText: {
        color: "white",
        bottom: 5,
    },
    scrollContent: {
        flexDirection: "row",
        paddingVertical: 5,

    },
    sViewContainer: {
        alignItems: "center",
        backgroundColor: "black",
    },
    qrButtonContainer: {
        position: "absolute",
        top: -28,
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        height: 90,
        borderRadius: 75,
        backgroundColor: "rgba(0, 0, 0,0.9)", // Slightly darker base for contrast
        shadowColor: "#FFD700", // Gold shadow
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6, // For Android
        zIndex: 99,
    },
    qrButtonGlow: {
        position: "absolute",
        top: -34,
        width: 100,
        height: 100,
        borderRadius: 75,
        backgroundColor: "rgba(243, 208, 103, 0.18)", // soft gold glow
        shadowColor: "rgba(243, 208, 103, 0.1)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        zIndex: -1,
    },

});

export default TabLayout;
