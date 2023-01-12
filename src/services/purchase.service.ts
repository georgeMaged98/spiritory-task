import { NotFoundError } from '../errors/not-found-error';
import {
  getItemData,
  getPurchaseData,
  getPurchaseItemData,
} from '../helpers/database';
import { IItem } from '../interfaces/item.interface';
import { IPurchase } from '../interfaces/purchase.interface';
import { IPurchaseItem } from '../interfaces/purchaseItem.interface';

const filterPurchaseItemsByPurchaseID = async (
  purchaseID?: number
): Promise<IPurchaseItem[]> => {
  try {
    let purchaseItemData: IPurchaseItem[] = await getPurchaseItemData();
    purchaseItemData = purchaseItemData.filter(
      (item) => item.PurchaseID === purchaseID
    );
    return _populatePurchaseItems(purchaseItemData);
  } catch (err) {
    throw new Error();
  }
};

const filterPurchasesById = async (
  itemID?: number
): Promise<IPurchase | undefined> => {
  try {
    const purchaseData: IPurchase[] = await getPurchaseData();

    const item: IPurchase | undefined = purchaseData.find(
      (item) => item.ID === itemID
    );
    if (!item) throw new NotFoundError('Resource Not Found');
    return item;
  } catch (err) {
    throw new Error();
  }
};

const filterItemsById = async (itemID?: number): Promise<IItem | undefined> => {
  try {
    const itemData: IItem[] = await getItemData();

    const item: IItem | undefined = itemData.find((item) => item.ID === itemID);
    if (!item) throw new NotFoundError('Resource Not Found');
    return item;
  } catch (err) {
    throw new Error();
  }
};

const _populatePurchaseItems = async (
  purchaseItems: IPurchaseItem[]
): Promise<IPurchaseItem[]> => {
  try {
    const itemData: IItem[] = await getItemData();

    const itemIDs = purchaseItems.map((item) => item.ItemID);

    const items: IItem[] = itemData.filter(async (item) =>
      itemIDs.includes(item.ID)
    );

    purchaseItems.forEach((item, index) => {
      item.ItemName = items[index].Name;
      delete item.ItemID;
      delete item.ID;
      delete item.PurchaseID;
    });
    return Promise.resolve(purchaseItems);
  } catch (err) {
    throw new Error();
  }
};

const getAllPurchases = async (): Promise<IPurchase[]> => {
  try {
    return getPurchaseData();
  } catch (err) {
    throw new Error();
  }
};

export {
  filterPurchaseItemsByPurchaseID,
  filterPurchasesById,
  filterItemsById,
  getAllPurchases,
};
