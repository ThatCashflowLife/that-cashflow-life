import { LoanDetails } from "./LoanDetails";
export interface Transaction {
  scanType: "Transaction";
  name: string;
  timestamp: string;
  type: "salary" | "passive income" | "expense" | "asset" | "liability" | "career"|"deal"|"savings"|"stocks"|"cd";
  description: string;
  amount: number;
  fieldName: string;
  loanDetails?: LoanDetails;
}

export default Transaction;
