// this is test data, to be reviewed/refined by clayton
import Assets from "./assets";
import Income from "./income";
import Liabilities from "./liabilities";
import MonthlyExpenses from "./monthlyExpenses";

// obj containing all information about a single user
export default interface User {
  name: string;
  profession: string;
  totalIncome: number;
  incomeExplained: Income;
  totalExpenses: number;
  expensesExplained: MonthlyExpenses;
  Assets: Assets;
  Liabilities: Liabilities;
  Children: number;
  ChildCost: number;
  image: string; // this should be the route to the image for profession they're using
}
