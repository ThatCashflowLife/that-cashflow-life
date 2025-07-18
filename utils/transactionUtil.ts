import Theme from "../interfaces/theme";
import Transaction from "../interfaces/Transaction";

// determines the color based on the transaction type
export const getTypeColor = (type: Transaction["type"]) => {
  switch (type) {
    case "salary":
      return Theme.CFL_green; // income green
    case "passive income":
      return Theme.CFL_green; // income green
    case "expense":
      return Theme.CFL_red; // expense red
    case "asset":
      return Theme.CFL_purple; // asset purple
    case "liability":
      return Theme.CFL_orange; // liability orange
    case "career":
      return Theme.CFL_cyan;
    case "deal":
      return Theme.CFL_pink;
    case "cd":
      return Theme.CFL_dark_green;
    case "savings":
      return Theme.CFL_green;
    case "stocks":
      return Theme.CFL_green;
    default:
      return Theme.CFL_light_gray; // default gray
  }
};

// function to get the transaction w/ the most recent timestamp
export const findLatestTransaction = (transactions: Transaction[]) => {
  return transactions.reduce((mostRecent, current) => {
    return current.timestamp > mostRecent.timestamp ? current : mostRecent;
  }, transactions[0]);
};
export default getTypeColor;
