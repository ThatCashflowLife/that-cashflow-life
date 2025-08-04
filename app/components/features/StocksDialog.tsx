// StocksDialog.tsx — Fullscreen Dialog with Grid Cards and Fullscreen Stock Detail + Back Arrow
import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../../interfaces/theme";
import { StockData } from "../../../interfaces/Assets";

const screenWidth = Dimensions.get("window").width;

interface Props {
    isVisible: boolean;
    onSubmit: (
        symbol: string,
        shares: number,
        pricePerShare: number,
        type: "deposit" | "withdrawal"
    ) => void;
    onCancel: () => void;
    stocks: StockData;
}

interface StockItem {
    symbol: string;
    price: number;
    history: number[];
}

const stockSymbols = ["AAPL", "ADBE", "AMZN", "BAC", "INTC", "MSFT", "NVDA", "TSLA"];

const logoMap: { [key: string]: any } = {
    aapl: require("../../assets/logos/aapl.png"),
    tsla: require("../../assets/logos/tsla.png"),
    intc: require("../../assets/logos/intc.png"),
    msft: require("../../assets/logos/msft.png"),
    amzn: require("../../assets/logos/amzn.png"),
    adbe: require("../../assets/logos/adbe.png"),
    nvda: require("../../assets/logos/nvda.png"),
    bac: require("../../assets/logos/bac.png"),
    default: require("../../assets/logos/default.png"),
};

const getLogo = (symbol: string) => {
    const key = symbol.toLowerCase();
    return logoMap[key] || logoMap.default;
};

const generateRandomPrice = (base: number) => {
    const fluctuation = (Math.random() - 0.5) * 2;
    return parseFloat((base + base * fluctuation * 0.05).toFixed(2));
};

const StocksDialog: React.FC<Props> = ({ isVisible, onSubmit, onCancel, stocks }) => {
    const [marketData, setMarketData] = useState<StockItem[]>([]);
    const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
    const [inputShares, setInputShares] = useState("");

    useEffect(() => {
        const initial = stockSymbols.map((symbol) => ({
            symbol,
            price: Math.random() * 300 + 100,
            history: Array.from({ length: 10 }, () => Math.random() * 300 + 100),
        }));
        setMarketData(initial);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setMarketData((prev) =>
                prev.map((stock) => {
                    const newPrice = generateRandomPrice(stock.price);
                    return {
                        ...stock,
                        price: newPrice,
                        history: [...stock.history.slice(1), newPrice],
                    };
                })
            );
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const ownedSymbols = Object.keys(stocks.holdings);
    const owned = marketData.filter((m) => ownedSymbols.includes(m.symbol));
    const unowned = marketData.filter((m) => !ownedSymbols.includes(m.symbol));

    const openStockDetail = (stock: StockItem) => {
        setInputShares("");
        setSelectedStock(stock);
    };

    const closeDetail = () => {
        setSelectedStock(null);
        setInputShares("");
    };

    const renderCard = (stock: StockItem) => {
        const isOwned = !!stocks.holdings[stock.symbol];
        const shares = stocks.holdings[stock.symbol]?.shares || 0;
        const value = shares * stock.price;

        return (
            <TouchableOpacity
                style={styles.card}
                key={stock.symbol}
                onPress={() => openStockDetail(stock)}
            >
                <Image source={getLogo(stock.symbol)} style={styles.logo} />
                <Text style={styles.symbol}>{stock.symbol}</Text>
                <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
                {isOwned && (
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.owned}>{shares} shares</Text>
                        <Text style={styles.owned}>(${value.toFixed(2)})</Text>
                    </View>
                )}

            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={isVisible} animationType="slide" presentationStyle="fullScreen">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
                        <Ionicons name="close" size={40} color="#fff" style={{ marginRight: 5 }} />
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.sectionTitle}>Your Stocks</Text>
                    <FlatList
                        data={owned}
                        numColumns={3}
                        keyExtractor={(item) => item.symbol}
                        renderItem={({ item }) => renderCard(item)}
                    />

                    <Text style={styles.sectionTitle}>Available Stocks</Text>
                    <FlatList
                        data={unowned}
                        numColumns={3}
                        keyExtractor={(item) => item.symbol}
                        renderItem={({ item }) => renderCard(item)}
                    />

                    
                </View>

                {selectedStock && (
                    <Modal visible transparent animationType="fade">
                        <View style={styles.overlay}>
                        <View style={styles.detailContainer}>
                            <ScrollView contentContainerStyle={styles.detailContent}>
                                <TouchableOpacity style={styles.backRow} onPress={closeDetail}>
                                    <Ionicons name="arrow-back" size={30} color="#fff" style={{ marginRight: 5 }} />
                                </TouchableOpacity>

                                <Image source={getLogo(selectedStock.symbol)} style={styles.detailLogo} />
                                <Text style={styles.detailTitle}>{selectedStock.symbol}</Text>
                                <Text style={styles.detailPrice}>${selectedStock.price.toFixed(2)}</Text>
                                {stocks.holdings[selectedStock.symbol] && (
                                    <>
                                        <Text style={styles.detailShares}>
                                            You own {stocks.holdings[selectedStock.symbol].shares} shares
                                        </Text>
                                        <Text style={styles.detailAvg}>
                                            Avg: ${stocks.holdings[selectedStock.symbol].averagePrice.toFixed(2)}
                                        </Text>
                                    </>
                                )}

                                <LineChart
                                    data={{
                                        labels: Array(selectedStock.history.length).fill(""),
                                        datasets: [{ data: selectedStock.history }],
                                    }}
                                    width={screenWidth}
                                    height={screenWidth}
                                    chartConfig={{
                                        backgroundColor: "#000",
                                        backgroundGradientFrom: "#000",
                                        backgroundGradientTo: "#000",
                                        color: () => "rgba(0,255,0,0.5)",
                                        labelColor: () => "#ccc",
                                        propsForDots: { r: "2", strokeWidth: "1", stroke: "rgba(0,255,0,0.5)" },
                                        propsForBackgroundLines: { stroke: "#1c301c" },
                                    }}
                                    bezier
                                    style={{ borderRadius: 10, marginTop: 50 }}
                                />

                                <TextInput
                                    placeholder="Enter shares"
                                    placeholderTextColor="#aaa"
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={inputShares}
                                    onChangeText={setInputShares}
                                />

                                <View style={styles.actionRow}>
                                    <TouchableOpacity
                                        style={styles.buyButton}
                                        onPress={() => {
                                            onSubmit(
                                                selectedStock.symbol,
                                                parseFloat(inputShares),
                                                selectedStock.price,
                                                "deposit"
                                            );
                                            closeDetail();
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Buy</Text>
                                    </TouchableOpacity>

                                    {stocks.holdings[selectedStock.symbol] && (
                                        <TouchableOpacity
                                            style={styles.sellButton}
                                            onPress={() => {
                                                onSubmit(
                                                    selectedStock.symbol,
                                                    parseFloat(inputShares),
                                                    selectedStock.price,
                                                    "withdrawal"
                                                );
                                                closeDetail();
                                            }}
                                        >
                                            <Text style={styles.buttonText}>Sell</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </ScrollView>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
        paddingHorizontal: 0,
    },
    container: {
        backgroundColor: "#000",
        padding: 10,
        flex: 1,
        justifyContent: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 5,
    },
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: "#0f1a0f",
        borderRadius: 12,
        padding: 10,
        minWidth: screenWidth / 3 - 15,
        alignItems: "center",
    },
    logo: { width: 50, height: 50, marginBottom: 5 },
    symbol: { color: "#fff", fontWeight: "bold", fontSize: 25 },
    price: { color: "#ccc", fontSize: 15 },
    owned: { color: "#00e676", fontSize: 15, marginTop: 4 },
    closeButton: {
        backgroundColor: "rgba(0,50,0,0)",
        padding: 0,
        borderRadius: 8,
        alignItems: "flex-start",
        flexDirection: "row",
        width:"100%"
    },
    backRow: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 25,
        left: 20,
        padding: 12,
        zIndex: 10,
    },
    buttonText: { color: "#ccc", fontWeight: "bold", fontSize: 30 },
    detailContainer: {
        borderRadius: 0,
        paddingTop: 10,
        flex: 1,
        justifyContent: "center",
    },
    detailContent: {
        backgroundColor: "#000000",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
    },
    detailLogo: { width: 100, height: 100, marginBottom: 10 },
    detailTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
    detailPrice: { fontSize: 18, color: "#ccc", marginBottom: 10 },
    detailShares: { color: "#00e676", fontSize: 14 },
    detailAvg: { color: "#ccc", fontSize: 14 },
    input: {
        backgroundColor: "#1a2b1a",
        color: "#00ff90",
        fontSize: 16,
        borderRadius: 6,
        borderColor: "rgba(0,255,0,0.8)",
        borderWidth: 0.4,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 0,
        width: "100%",
    },
    actionRow: {
        flexDirection: "row",
        marginTop: 15,
        width: "100%",
    },
    buyButton: {
        flex: 1,
        backgroundColor: "rgba(0,255,0,0.4)",
        borderColor: "rgba(0,255,0,0.8)",
        borderWidth: 0.4,
        padding: 10,
        borderRadius: 6,
        marginRight: 5,
        alignItems: "center",
    },
    sellButton: {
        flex: 1,
        backgroundColor: "rgba(255,0,0,0.4)",
        borderColor: "rgba(255,0,0,0.8)",
        borderWidth: 0.4,
        padding: 10,
        borderRadius: 6,
        marginLeft: 5,
        alignItems: "center",
    },
});

export default StocksDialog;
