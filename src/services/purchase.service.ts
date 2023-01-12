import { NotFoundError } from '../errors/not-found-error';
import {
  getItemData,
  getPurchaseData,
  getPurchaseItemData,
} from '../helpers/database';
import { IItem } from '../interfaces/item.interface';
import { IPurchase } from '../interfaces/Purchase.interface';
import { IPurchaseItem } from '../interfaces/PurchaseItem.interface';

const filterPurchaseItemsByPurchaseID = async (
  purchaseID?: number
): Promise<IPurchaseItem[]> => {
  let purchaseItemData: IPurchaseItem[] = await getPurchaseItemData();
  purchaseItemData = purchaseItemData.filter(
    (item) => item.PurchaseID === purchaseID
  );
  return populatePurchaseItems(purchaseItemData);
};

const filterPurchasesById = async (
  itemID?: number
): Promise<IPurchase | undefined> => {
  const purchaseData: IPurchase[] = await getPurchaseData();

  const item: IPurchase | undefined = purchaseData.find(
    (item) => item.ID === itemID
  );
  if (!item) throw new NotFoundError('Resource Not Found');
  return item;
};

const filterItemsById = async (itemID?: number): Promise<IItem | undefined> => {
  const itemData: IItem[] = await getItemData();

  const item: IItem | undefined = itemData.find((item) => item.ID === itemID);
  if (!item) throw new NotFoundError('Resource Not Found');
  return item;
};

const populatePurchaseItems = async (
  purchaseItems: IPurchaseItem[]
): Promise<IPurchaseItem[]> => {
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
};

export {
  filterPurchaseItemsByPurchaseID,
  filterPurchasesById,
  filterItemsById,
  populatePurchaseItems,
};
