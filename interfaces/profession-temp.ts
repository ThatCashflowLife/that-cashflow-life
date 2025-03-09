import Assets from "./assets-temp";
import Income from "./income-temp";
import Liabilities from "./liabilities-temp";
import MonthlyExpenses from "./monthlyexpenses-temp";

export default interface Profession {
  name: string;
  scanType: "Profession";
  income: Income;
  expenses: MonthlyExpenses;
  assets: Assets;
  liabilities: Liabilities;
}
