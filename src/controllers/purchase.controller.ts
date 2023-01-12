import { NextFunction, Request, Response } from 'express';
import {
  filterPurchaseItemsByPurchaseID,
  getAllPurchases,
} from '../services/purchase.service';
import { ISinglePurchase } from '../interfaces/purchaseResults.interface';
import { IPurchase } from '../interfaces/purchase.interface';

const getPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purchasesPromises: Promise<any>[] = []; // for resolving promises concurrently for faster performance
    const allPurchases: IPurchase[] = await getAllPurchases();
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

    return res.send({
      purchases: purchasesResult,
    });
  } catch (err) {
    next(new Error());
  }
};

export { getPurchases };
