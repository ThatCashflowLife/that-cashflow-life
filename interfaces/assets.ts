// this is test data, to be reviewed/refined by clayton
export default interface Assets {
  savings: number;
  investments?: Investments;
}

interface Investments {
  name: string;
  type: string;  //House, business etc...
  description: string;
  "Purchase Price": number;
  "Sale Range": string;
  "Sale Price"?: number; //Final sale price
  "Cash Flow": number; //Monthly income (If rented or business)
  Mortgage: number;
  Stocks: number;
  Gold_Count: number;
}
