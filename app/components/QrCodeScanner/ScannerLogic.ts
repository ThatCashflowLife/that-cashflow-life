import Profession from "../../../interfaces/Profession";
import allProfessions from "../../../data/Professions";
import Transaction from "../../../interfaces/Transaction";
import User, { Icon } from "../../../interfaces/User";
import formatTimestamp from "../../../utils/timeUtil";
import Liabilities from "../../../interfaces/Liabilities";
import { PassiveIncome } from "../../../interfaces/Income";
import calculateTotalAssets from "../../../utils/calculateTotalAssets";
import { RealEstate } from "../../../interfaces/Assets";
import { CertificateOfDeposit } from "../../../interfaces/Assets";
import MonthlyExpenses from "../../../interfaces/MonthlyExpenses";

import { calculateTotals } from "../UserFinances/FinancialOverview";

export type PassiveIncomeCategory = keyof PassiveIncome;

/**
 * Get the icon name that matches the profession name,
 * and the library the icon comes from within expo/vector icons
 *
 * @param professionName - name of newly scanned profession
 * @returns an object with the icon name and library
 */
export const getIcon = (professionName: string): Icon => {
  const iconMapping: { [key: string]: Icon } = {
    "Airline Pilot": { name: "plane-departure", library: "FontAwesome6" },
    "Business Manager": { name: "user-tie", library: "FontAwesome6" },
    Doctor: { name: "user-doctor", library: "FontAwesome6" },
    Engineer: { name: "user-gear", library: "FontAwesome6" },
    Janitor: { name: "cleaning-services", library: "MaterialIcons" },
    Lawyer: { name: "law", library: "Octicons" },
    Nurse: { name: "user-nurse", library: "FontAwesome6" },
    "Police Officer": { name: "handcuffs", library: "FontAwesome6" },
    Secretary: { name: "old-phone", library: "Entypo" },
    Teacher: { name: "chalkboard-teacher", library: "FontAwesome5" },
    "Truck Driver": { name: "truck", library: "FontAwesome5" },
  };

  return (
    iconMapping[professionName] || {
      name: "questioncircle",
      library: "AntDesign",
    }
  );
};

/**
 *  populate fields on the user object from the incoming profession (for user defaults)
 * @param scannedProfession - scanned in profession object
 * @param currentUser - copy of current user object state
 * @returns a new User object with the scanned fields updated
 */
export const populateFirstProfession = (
  scannedProfession: Profession,
  currentUser: User
): User => {
  const userInitialValues: User = {
    ...currentUser,
    profession: scannedProfession.name,
    income: scannedProfession.income,
    expenses: scannedProfession.expenses,
    Assets: {
      Savings: scannedProfession.assets.Savings ?? 0,
      Investments: {
        Mortgage: scannedProfession.assets.Investments?.Mortgage ?? 0,

        // Always an array
        RealEstate: Array.isArray(scannedProfession.assets.Investments?.RealEstate)
          ? scannedProfession.assets.Investments.RealEstate
          : [],

        // Stocks fallback
        Stocks: scannedProfession.assets.Investments?.Stocks ?? {
          totalValue: 0,
          holdings: {},
        },

        Gold_Count: scannedProfession.assets.Investments?.Gold_Count ?? 0,
        Bitcoin: scannedProfession.assets.Investments?.Bitcoin ?? 0,
        "Bitcoin Value": scannedProfession.assets.Investments?.["Bitcoin Value"] ?? 0,

        // CDs always array
        CDs: Array.isArray(scannedProfession.assets.Investments?.CDs)
          ? scannedProfession.assets.Investments.CDs
          : [],
      },
    },
    Liabilities: scannedProfession.liabilities,
    professionIcon: getIcon(scannedProfession.name),
  };

  return userInitialValues;
};


/**
 * only populate profession name, icon and salary for all professions after the first
 * @param scannedProfession 
 * @param currentUser 
 * @returns user object w changed profession, salary and icon 
 */
export const populateLaterProfession = (
  scannedProfession: Profession,
  currentUser: User
): User => {
  const changedProfessionValues: User = {
    ...currentUser,
    profession: scannedProfession.name,
    income: {
      ...currentUser.income,
      Salary: scannedProfession.income.Salary,
    },
    professionIcon: getIcon(scannedProfession.name),
  };

  return changedProfessionValues;
};

/**
 * Creates transaction for a new job
 * @param scannedProfession 
 * @returns transaction object
 */
export const createProfessionTransaction = (scannedProfession: Profession): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  const newJobTransaction: Transaction = {
    scanType: "Transaction",
    name: `New Job: ${scannedProfession.name}`,
    timestamp,
    type: "career",
    description: `Now employed as a ${scannedProfession.name}.`,
    amount: scannedProfession.income.Salary,
    fieldName: "Salary",
  };
  return newJobTransaction;
}
/**
 * Creates transaction for a new baby
 * @param scannedTransaction
 * @returns transaction object
 */
export const createBabyTransaction = (currentUser: User): Transaction => {

  const profession = allProfessions.find(
    (p) => p.name === currentUser.profession
  );

  const perChildExpense = profession?.expenses?.["Per Child Expense"] || 0;

  const babyTransaction: Transaction = {
    scanType: "Transaction",
    name: "New Baby",
    timestamp: formatTimestamp(new Date().toISOString()),
    type: "expense",
    description: `Player had a child.`,
    amount: -perChildExpense, // dynamically calculated
    fieldName: "Children",
  };

  return babyTransaction;
};

/**
 * Increments the user's child count and updates the Children expense
 * based on the Per Child Expense defined in their profession data.
 *
 * @param currentUser - The current user object
 * @returns updated user object with incremented children and updated expenses
 */
export const addChildToUser = (currentUser: User): User => {
  const updatedChildren = currentUser.Children + 1;

  // Find matching profession data
  const professionData: Profession | undefined = allProfessions.find(
    (p) => p.name === currentUser.profession
  );

  // Default to 0 if not defined
  const perChildExpense = professionData?.expenses?.["Per Child Expense"] || 0;

  // Update user's children and child-related expense
  return {
    ...currentUser,
    Children: updatedChildren,
    expenses: {
      ...currentUser.expenses,
      Children: perChildExpense * updatedChildren,
    },
  };
};
/**
 * Creates transaction for a new loan
 * @param scannedTransaction
 * @returns transaction object
 */
export const createLoanTransaction = (loanDetails: {
  amount: number;
  payment: number;
  purpose: string;
}): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  return {
    scanType: "Transaction",
    name: `Loan: ${loanDetails.purpose}`,
    timestamp,
    type: "expense",
    description: `Loan for ${loanDetails.purpose}`,
    amount: -loanDetails.amount,
    fieldName: loanDetails.purpose,
  };
};





/**
 * Increments the user's loan count and updates the Loans expense
 * based on the Per Loan Expense defined in their profession data.
 *
 * @param currentUser - The current user object
 * @returns updated user object with incremented loans and updated expenses
 */
export const addLoanToUser = (
  currentUser: User,
  loanDetails: {
    amount: number;
    payment: number;
    purpose: string;
  }
): User => {
  const category = "Personal Loans"; // or "School Loans", etc.
  const existingLoans = currentUser.Liabilities[category] || {};

  const updatedLiabilities = {
    ...currentUser.Liabilities,
    [category]: {
      ...(existingLoans as { [loanName: string]: number }),
      [loanDetails.purpose]: loanDetails.amount,
    },
  };

  const existingLoanPayment = currentUser.expenses["Personal Loan Payment"] || 0;
  const updatedExpenses = {
    ...currentUser.expenses,
    "Personal Loan Payment": existingLoanPayment + loanDetails.payment,
  };

  return {
    ...currentUser,
    Liabilities: updatedLiabilities,
    expenses: updatedExpenses,
  };
};



const loanExpenseMap: { [key: string]: keyof MonthlyExpenses } = {
  "Car Loans": "Car Loan Payment",
  "Credit Cards": "Credit Cards Payment",
  "School Loans": "School Loans Payment",
  "Retail Debts": "Retail Debt Payment",
  "Personal Loans": "Personal Loan Payment",
};

export const createPaymentTransaction = (amount: number, category: LoanCategory): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  return {
    scanType: "Transaction",
    name: `Payment toward ${category}`,
    timestamp,
    type: "expense",
    description: `Paid $${amount} toward ${category}`,
    amount: -amount, // negative because it's money going out
    fieldName: category,
  };
};
export type LoanCategory = keyof Liabilities;
export function applyPaymentToLoan(user: User, amount: number, category: string): User {
  const updatedUser = { ...user };

  const [mainCategory, subCategory] = category.split(":").map(part => part.trim());

  const loanExpenseMap: { [key: string]: keyof MonthlyExpenses } = {
    "Car Loans": "Car Loan Payment",
    "Credit Cards": "Credit Cards Payment",
    "School Loans": "School Loans Payment",
    "Retail Debt": "Retail Debt Payment",
    "Personal Loans": "Personal Loan Payment",
  };

  if (mainCategory === "Real Estate" && subCategory) {
    const property = updatedUser.Assets.Investments?.RealEstate?.find(p => p.name === subCategory);
    if (property) {
      property.Mortgage = Math.max(0, property.Mortgage - amount);
    }

    const remainingMortgagePayment = updatedUser.Assets.Investments?.RealEstate
      ?.filter(p => p.Mortgage > 0)
      .reduce((total, p) => {
        const purchasePrice = p["Purchase Price"] || 0;
        return total + (purchasePrice * 0.10) / 12;
      }, 0) || 0;

    updatedUser.expenses["Mortgage Payment"] = remainingMortgagePayment;

  } else if (updatedUser.Liabilities[mainCategory]) {
    if (typeof updatedUser.Liabilities[mainCategory] === "number") {
      updatedUser.Liabilities[mainCategory] = Math.max(0, updatedUser.Liabilities[mainCategory] - amount);
      if (updatedUser.Liabilities[mainCategory] === 0) {
        const expenseKey = loanExpenseMap[mainCategory];
        if (expenseKey) {
          updatedUser.expenses[expenseKey] = 0;
        }
      }
    } else if (typeof updatedUser.Liabilities[mainCategory] === "object" && subCategory) {
      updatedUser.Liabilities[mainCategory][subCategory] = Math.max(
        0,
        updatedUser.Liabilities[mainCategory][subCategory] - amount
      );

      // Check if all sub-loans are now 0
      const allZero = Object.values(updatedUser.Liabilities[mainCategory]).every(val => val === 0);
      if (allZero) {
        const expenseKey = loanExpenseMap[mainCategory];
        if (expenseKey) {
          updatedUser.expenses[expenseKey] = 0;
        }
      }
    }
  }

  // Recalculate total monthly expenses
  updatedUser.totalExpenses = Object.values(updatedUser.expenses).reduce((sum, val) => sum + (val || 0), 0);

  return updatedUser;
}









export const applyDealToUser = (
  currentUser: User,
  cashflow: number,
  mortgage: number,
  incomeType: keyof PassiveIncome,
  propertyType: string,
  saleRange: string
): User => {
  const now = formatTimestamp(new Date().toISOString());

  const realEstateList = currentUser.Assets?.Investments?.RealEstate ?? [];

  const typeCount = realEstateList.filter(
    (property) => property.type === propertyType
  ).length;

  const countForName = typeCount > 0 ? typeCount + 1 : 1;

  const newProperty: RealEstate = {
    name: `${propertyType} ${countForName}`,
    type: propertyType as RealEstate["type"],
    description: `Deal for ${propertyType} added.`,
    "Purchase Price": mortgage,
    "Sale Range": saleRange,
    "Cash Flow": cashflow,
    Mortgage: mortgage,
    "Down Payment": 10000,
    purchaseTime: now,
    saleTime: "",
  };

  const updatedProperties = [...realEstateList, newProperty];

  const remainingMortgagePayment = updatedProperties
    .filter(p => p.Mortgage > 0)
    .reduce((total, p) => {
      const purchasePrice = p["Purchase Price"] || 0;
      return total + (purchasePrice * 0.10) / 12;
    }, 0);

  return {
    ...currentUser,
    income: {
      ...currentUser.income,
      "Passive Income": {
        ...currentUser.income["Passive Income"],
        [incomeType]: (currentUser.income["Passive Income"][incomeType] || 0) + cashflow,
      },
    },
    Assets: {
      ...currentUser.Assets,
      Investments: {
        ...currentUser.Assets?.Investments,
        RealEstate: updatedProperties,
      },
    },
    expenses: {
      ...currentUser.expenses,
      "Mortgage Payment": remainingMortgagePayment,
    },
  };
};







export const createDealTransaction = (
  amount: number,
  mortgage: number,
  incomeCategory: PassiveIncomeCategory
): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  return {
    scanType: "Transaction",
    name: `New Deal (${incomeCategory})`,
    timestamp,
    type: "deal",
    description: `New property adding $${amount}/month`,
    amount: amount,
    fieldName: incomeCategory,
  };
};


export function updateSavingsAmount(
  user: User,
  amount: number,
  type: "deposit" | "withdrawal"
): User {
  const updatedUser = { ...user };

  if (typeof updatedUser.Assets.Savings !== "number") {
    updatedUser.Assets.Savings = 0;
  }

  if (type === "deposit") {
    updatedUser.Assets.Savings += amount;
  } else {
    updatedUser.Assets.Savings = Math.max(0, updatedUser.Assets.Savings - amount);
  }

  updatedUser.totalAssets = calculateTotalAssets(updatedUser);

  return updatedUser;
}




export const createSavingsTransaction = (
  amount: number,
  type: "deposit" | "withdrawal"
): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  return {
    scanType: "Transaction",
    name: `Savings ${type === "deposit" ? "Deposit" : "Withdrawal"}`,
    timestamp,
    type: "savings",
    description: `${type === "deposit" ? "Deposited" : "Withdrew"} $${amount} from savings.`,
    amount: amount,
    fieldName: "Savings",
  };
};
export function updateStocks(
  user: User,
  symbol: string,
  shares: number,
  pricePerShare: number,
  type: "deposit" | "withdrawal"
): User {
  const updatedUser = { ...user };

  // Initialize stock structure
  if (!updatedUser.Assets.Investments) {
    updatedUser.Assets.Investments = {} as any;
  }

  if (!updatedUser.Assets.Investments.Stocks) {
    updatedUser.Assets.Investments.Stocks = {
      totalValue: 0,
      holdings: {},
    };
  }

  const stocks = updatedUser.Assets.Investments.Stocks;

  if (!stocks.holdings[symbol]) {
    stocks.holdings[symbol] = { shares: 0, averagePrice: 0 };
  }

  const holding = stocks.holdings[symbol];

  if (type === "deposit") {
    const totalExistingValue = holding.shares * holding.averagePrice;
    const totalNewValue = shares * pricePerShare;
    const newTotalShares = holding.shares + shares;

    holding.averagePrice = (totalExistingValue + totalNewValue) / newTotalShares;
    holding.shares = newTotalShares;
  } else {
    holding.shares = Math.max(0, holding.shares - shares);
    if (holding.shares === 0) {
      holding.averagePrice = 0;
    }
  }

  let totalValue = 0;
  for (const key in stocks.holdings) {
    const h = stocks.holdings[key];
    totalValue += h.shares * h.averagePrice;
  }

  stocks.totalValue = totalValue;
  updatedUser.totalAssets = calculateTotalAssets(updatedUser);

  return updatedUser;
}





export const createStockTransaction = (
  symbol: string,
  shares: number,
  price: number,
  type: "deposit" | "withdrawal"
): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  return {
    scanType: "Transaction",
    name: `Stock ${type === "deposit" ? "Buy" : "Sell"}: ${symbol}`,
    timestamp: timestamp,
    type: "stocks",
    description: `${type === "deposit" ? "Bought" : "Sold"} ${shares} share(s) of ${symbol} at $${price}/share.`,
    amount: shares * price,
    fieldName: "stocks",
  };
};

//add CD

export const addCertificateOfDeposit = (
  user: User,
  cd: CertificateOfDeposit
): User => {
  const existingCDsRaw = user.Assets.Investments?.CDs;
  const existingCDs = Array.isArray(existingCDsRaw) ? existingCDsRaw : [];

  return {
    ...user,
    Assets: {
      ...user.Assets,
      Investments: {
        ...user.Assets.Investments,
        CDs: [...existingCDs, cd],
      },
    },
  };
  
};
export const createCDTransaction = (
  name: string,
  amount: number,
  interestRate: number,
  termMonths: number,
  startDate: string,
  maturityDate: string
): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());
  
  return {
    scanType: "Transaction",
    name: `CD Purchase: ${name}`,
    timestamp,
    type: "cd",
    description: `Purchased a ${termMonths}-month CD for $${amount.toFixed(2)} at ${interestRate}% APR. Matures on ${maturityDate}.`,
    amount,
    fieldName: name, // Or "cd" if you want a generic field reference
  };
};
export const createPropertySaleTransaction = (
  propertyName: string,
  salePrice: number
): Transaction => {
  const timestamp = formatTimestamp(new Date().toISOString());

  return {
    scanType: "Transaction",
    name: `Sold: ${propertyName}`,
    timestamp,
    type: "Property Sale",
    description: `Sold ${propertyName} for $${salePrice.toFixed(2)}.`,
    amount: salePrice,
    fieldName: "Real Estate",
  };
};





export default populateFirstProfession;
