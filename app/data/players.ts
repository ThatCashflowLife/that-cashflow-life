import Expenses from "./Expenses";

export interface Players {
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  profession: string;
  income: number;
  expenses: Expenses;
  netWorth: number;
  failedAudits: number;
  children: number;
  vehicles: number;
}
