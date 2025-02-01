import Transaction from "@/interfaces/transaction";
// these values are just sample for testing and are likely to be changed
export const testTransactions: Transaction[] = [
  {
    id: "1",
    timestamp: "2025-02-01",
    type: "income",
    description: "Salary Increase",
    amount: 1000,
    fieldName: "incomeExplained.salary",
  },
  {
    id: "2",
    timestamp: "2025-02-01",
    type: "expense",
    description: "New Car Payment",
    amount: 400,
    fieldName: "expensesExplained.carPayment",
  },
  {
    id: "3",
    timestamp: "2025-02-01",
    type: "asset",
    description: "New Car Purchase",
    amount: 25000,
    fieldName: "Assets.car",
  },
  {
    id: "4",
    timestamp: "2025-02-01",
    type: "liability",
    description: "Car Loan",
    amount: 20000,
    fieldName: "Liabilities.carLoan",
  },
];
