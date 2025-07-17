export default interface Liabilities {
  [key: string]: number | { [subkey: string]: number } | undefined;
  "School Loans"?: { [loanName: string]: number };
  "Car Loans"?: { [loanName: string]: number };
  "Credit Cards"?: { [loanName: string]: number };
  "Retail Debt"?: { [loanName: string]: number };
  "Personal Loans"?: { [loanName: string]: number };
  "Per Loan Expense"?: number;
}
  
