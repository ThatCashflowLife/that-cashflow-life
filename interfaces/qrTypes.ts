import Profession from "./profession-temp";
import Transaction from "./transaction-temp";

// obj containing all scannable types
export default interface QRType {
  type: string;
  data: QRData;
  scanType?: "Profession" | "Transaction";
}

// Define a union type for scanned QR data
export type QRData = Profession | Transaction;
