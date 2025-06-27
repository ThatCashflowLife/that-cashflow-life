import User from "../interfaces/User";

export default function calculateTotalAssets(user: User): number {
    const savings = user.Assets?.Savings ?? 0;
    const stocks = user.Assets?.Investments?.Stocks?.totalValue ?? 0;

    // Add more assets here as needed (e.g., Bitcoin, Real Estate, etc.)
    return savings + stocks;
}
