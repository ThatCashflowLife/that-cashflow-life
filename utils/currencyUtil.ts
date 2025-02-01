// Format number as USD
export const formatUSD = (amount: number) => {
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
