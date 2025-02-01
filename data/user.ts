// this is test data, to be reviewed/refined by clayton
import Assets from "./assets";
import ChildCost from "./childCost";
import Income from "./income";
import Liabilities from "./liabilities";
import Expenses from "./monthlyExpenses";

// array of all users in the game
export interface Users {
  players: User[];
}

// obj containing all information about a single user
export default interface User {
  name: string;
  profession?: string;
  totalIncome: number;
  incomeExplained: Income;
  totalExpenses: number;
  expensesExplained: Expenses;
  Assets: Assets;
  Liabilities: Liabilities;
  children: number;
  childCost: ChildCost;
  failedAudits: number;
  image: string; // this should be the route to the image they're using
}
