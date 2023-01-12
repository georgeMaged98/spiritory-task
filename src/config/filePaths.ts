import path from 'path';

const userFilePath = path.join(__dirname, '../data/user.json');
const metadataFilePath = path.join(__dirname, '../data/metadata.json');
const purchaseitemFilePath = path.join(__dirname, '../data/purchaseItem.json');
const itemFilePath = path.join(__dirname, '../data/item.json');
const purchaseFilePath = path.join(__dirname, '../data/purchase.json');

export {
  userFilePath,
  metadataFilePath,
  purchaseFilePath,
  itemFilePath,
  purchaseitemFilePath,
};
