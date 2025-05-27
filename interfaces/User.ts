import Assets from "./Assets";
import Income from "./Income";
import Liabilities from "./Liabilities";
import MonthlyExpenses from "./MonthlyExpenses";

// obj containing all information about a single user
export interface User {
  name: string;
  profession: string;
  totalIncome?: number; // possibly undefined when scanned in, calculated after
  income: Income;
  totalExpenses?: number; // possibly undefined when scanned in, calculated after
  expenses: MonthlyExpenses; 
  Assets: Assets;
  totalAssets?: number; // possibly undefined when scanned in, calculated after
  Liabilities: Liabilities; 
  totalLiabilites?: number; // possibly undefined when scanned in, calculated after
  netWorth?: number; // possibly undefined when scanned in, calculated after
  Children: number;
  ChildCost: number;
  Loans: number;
  LoanPayment: number;
  professionIcon: Icon; // this should be the name of the expo/vector icon for the profession and which library its from
}
export interface Icon {
  name: string;
  library:
  | "AntDesign"
  | "FontAwesome6"
  | "MaterialIcons"
  | "Octicons"
  | "Entypo"
  | "FontAwesome5";
}

export default User;
