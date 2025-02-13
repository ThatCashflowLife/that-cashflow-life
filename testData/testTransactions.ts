import Transaction from "../interfaces/transaction";
// these values are just sample for testing and are likely to be changed
export const testTransactions: Transaction[] = [
  {
    id: "1",
    timestamp: "2025-02-01 02:30",
    type: "salary",
    description: "Salary Increase",
    amount: 1000,
    fieldName: "incomeExplained.salary",
  },
  {
    id: "2",
    timestamp: "2025-02-08T00:30", // test ISO format timestamp
    type: "expense",
    description: "New Car Payment",
    amount: -400,
    fieldName: "expensesExplained.carPayment",
  },
  {
    id: "3",
    timestamp: "2025-02-08 18:30", // test simple time format timestamp
    type: "asset",
    description: "New Car Purchase",
    amount: -25000,
    fieldName: "Assets.car",
  },
  {
    id: "4",
    timestamp: "2025-02-08 15:30:00", // test full datetime format
    type: "liability",
    description: "Car Loan",
    amount: -20000,
    fieldName: "Liabilities.carLoan",
  },
  {
    id: "5",
    timestamp: "2025-02-08", // test only date, no time
    type: "passive income",
    description: "Dividend Payout",
    amount: 5,
    fieldName: "incomeExplained.salary",
  },
];
