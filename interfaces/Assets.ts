export default interface Assets {
  Savings: number;
  Investments: Investments;
}

export interface Investments {
  Mortgage: number;
  RealEstate: RealEstate[];
  Stocks: StockData;
  Gold_Count: number;
  Bitcoin: number;
  "Bitcoin Value": number;
  "Certificate Deposit": number;
}


export interface StockData {
  totalValue: number;
  holdings: {
    [symbol: string]: {
      shares: number;
      averagePrice: number;
    };
  };
}


export interface RealEstate {
  // for house/business assets and their "transaction"
  name: string;
  type: "3Br/2Ba House" | "Duplex" | "4-Plex" | "8-Plex" | "Apartment Complex" | "Business";
  description: string;
  "Purchase Price": number; // What was it bought for?
  "Sale Range": string; // What can it sell for? (estimated)
  "Sale Price"?: number; // Final sale price
  "Cash Flow": number; // Monthly income (If rented or business)
  Mortgage: number;
  "Down Payment": number;
  purchaseTime: string;
  saleTime: string;
}
