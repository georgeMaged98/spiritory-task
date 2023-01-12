// This file can be further optimized using OOP principles and having getData and setData in an abstract class that deals with filesystem
// and use polymorphism to read/write from files but since that is only for simulation, there is no need for that.
import { readFile, writeFile } from 'fs/promises';

import {
  userFilePath,
  metadataFilePath,
  purchaseFilePath,
  itemFilePath,
  purchaseitemFilePath,
} from '../config/filePaths';
import { IItem } from '../interfaces/item.interface';
import { IMetadata } from '../interfaces/metadata.interface';
import { IPurchase } from '../interfaces/purchase.interface';
import { IPurchaseItem } from '../interfaces/purchaseItem.interface';
import { IUser } from '../interfaces/user.interface';

const getUserData = async (): Promise<IUser[]> => {
  const data: string = await readFile(userFilePath, 'utf-8');
  return JSON.parse(data);
};

const saveUserData = (data: IUser[]): Promise<void> => {
  return writeFile(userFilePath, JSON.stringify(data), 'utf-8');
};

const getMetaData = async (): Promise<IMetadata> => {
  const data: string = await readFile(metadataFilePath, 'utf-8');
  return JSON.parse(data);
};

const saveMetaData = (data: IMetadata): Promise<void> => {
  return writeFile(metadataFilePath, JSON.stringify(data), 'utf-8');
};

const getPurchaseData = async (): Promise<IPurchase[]> => {
  const data: string = await readFile(purchaseFilePath, 'utf-8');
  return JSON.parse(data);
};

const savePurchaseData = (data: IPurchase[]): Promise<void> => {
  return writeFile(purchaseFilePath, JSON.stringify(data), 'utf-8');
};

const getPurchaseItemData = async (): Promise<IPurchaseItem[]> => {
  const data: string = await readFile(purchaseitemFilePath, 'utf-8');
  return JSON.parse(data);
};

const savePurchaseItemData = (data: IPurchaseItem[]): Promise<void> => {
  return writeFile(purchaseitemFilePath, JSON.stringify(data), 'utf-8');
};

const getItemData = async (): Promise<IItem[]> => {
  const data: string = await readFile(itemFilePath, 'utf-8');
  return JSON.parse(data);
};

const saveItemData = (data: IItem[]): Promise<void> => {
  return writeFile(itemFilePath, JSON.stringify(data), 'utf-8');
};
export {
  getUserData,
  saveUserData,
  saveMetaData,
  getMetaData,
  getPurchaseData,
  savePurchaseData,
  getPurchaseItemData,
  savePurchaseItemData,
  getItemData,
  saveItemData,
};
