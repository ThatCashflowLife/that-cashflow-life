/* eslint-disable @typescript-eslint/no-unused-vars */
import Transaction from "../../../interfaces/Transaction";
import formatTimestamp from "../../../utils/timeUtil";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
export const Baby: Transaction = {
  name: "New Baby", 
  scanType: "Transaction",
  timestamp: formatTimestamp(new Date().toISOString()),
  type: "expense",
  description: "New Expense: Baby",
  amount: 0, // Placeholder — calculated at runtime
  fieldName: "Children"
};

export default Baby;
