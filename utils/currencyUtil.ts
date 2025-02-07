import Assets from "@/interfaces/assets";
import { PassiveIncome } from "@/interfaces/income";

// Format number as USD
export const formatUSD = (amount: number | PassiveIncome | Assets) => {
  if (typeof amount === "number" && amount > 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } else {
    return "$0.00";
  }
};
export default formatUSD;
