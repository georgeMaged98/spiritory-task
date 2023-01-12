import { NextFunction, Request, Response } from 'express';
import { filterPurchaseItemsByPurchaseID } from '../services/purchase.service';
import { IPurchaseItem } from '../interfaces/PurchaseItem.interface';
import { getMetaData, getPurchaseData } from '../helpers/database';
import { ISinglePurchase } from '../interfaces/purchaseResults.interface';
import { IPurchase } from '../interfaces/Purchase.interface';

const getPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purchasesPromises: Promise<any>[] = [];
    const allPurchases: IPurchase[] = await getPurchaseData();
    const purchasesResult: ISinglePurchase[] = [];

    for (const pur of allPurchases) {
      purchasesPromises.push(filterPurchaseItemsByPurchaseID(pur.ID));
      purchasesResult.push({
        PurchaseID: pur.ID,
        UserID: pur.UserID,
        Date: pur.Date,
        purchaseItems: [],
      });
    }
    const purchaseItemResults = await Promise.all(purchasesPromises);

    purchaseItemResults.forEach((item, index) => {
      purchasesResult[index].purchaseItems = purchaseItemResults[index];
    });

    res.send({
      purchases: purchasesResult,
    });
  } catch (err) {
    next(new Error());
  }
};

export { getPurchases };
