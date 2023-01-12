import { IPurchaseItem } from './PurchaseItem.interface';

export interface ISinglePurchase {
  PurchaseID: number;
  Date: Date;
  UserID: number;
  purchaseItems: IPurchaseItem[];
}
// export interface IPurchaseResult {
//   purchases: ISinglePurchase[];
// }
