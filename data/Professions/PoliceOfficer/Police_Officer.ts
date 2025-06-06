/* eslint-disable @typescript-eslint/no-unused-vars */
import Profession from "../../../interfaces/Profession";

// ANYTIME THIS FILE IS CHANGED THE CORRESPONDING JSON AND QRCODE PNG MUST BE CHANGED TO MATCH
export const Police_Officer: Profession = {
  name: "Police Officer",
  scanType: "Profession",
  income: {
    Salary: 3000,
    "Passive Income": {
      Dividends: 0,
      Interest: 0,
      "Real Estate Income": 0,
      "Business Income": 0,
    },
  },
  expenses: {
    "Monthly Taxes": 580,
    "Mortgage Payment": 400,
    "School Loans": 0,
    "Car Payment": 100,
    "Credit Card Payment": 60,
    "Retail Spending": 50,
    Other: 690,
    "Per Child Expense": 160,
  },
  assets: {
    Savings: 520,
  },
  liabilities: {
    "Mortgage Total": 46000,
    "School Loans Total": 0,
    "Car Loans": 5000,
    "Credit Card Loans": 2000,
    "Retail Debt": 1000,
  },
};
export default Police_Officer;
