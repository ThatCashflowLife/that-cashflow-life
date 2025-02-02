import User from "@/interfaces/user";

// temporary testing object for full user data
const testUser: User = {
  name: "John Smith",
  profession: "Software Developer",
  totalIncome: 8500,
  incomeExplained: {
    Salary: 7000,
    Interest: 1000,
    Dividends: 500,
    "Real Estate Income": 0,
    "Business Income": 200,
  },
  totalExpenses: 5300,
  expensesExplained: {
    "monthly taxes": 300,
    "mortgage payment": 1900,
    "School Loans": 50,
    "Car Payment": 300,
    "Credit Card Payment": 200,
    "Retail Spending": 75,
    Other: 350,
    "Childcare Expenses": 800,
    "Per Child Expense": 0,
  },
  Assets: {
    savings: 0,
    investments: 6000,
  },
  Liabilities: {
    "Mortgage Total": 280000,
    "School Loans Total": 18000,
    "Car Loans": 5000,
    "Credit Card Loans": 2000,
    "Retail Debt": 100,
  },
  children: 2,
  childCost: 0,
  failedAudits: 0,
  image: "/assets/avatars/glassesMan.png",
};

export default testUser;
