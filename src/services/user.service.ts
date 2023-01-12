import {
  getUserData,
  saveUserData,
  getMetaData,
  saveMetaData,
} from '../helpers/database';
import { IMetadata } from '../interfaces/metadata.interface';
import { IUser } from '../interfaces/user.interface';

const createUser = async (newUser: IUser): Promise<void> => {
  try {
    const metadata: IMetadata = await getMetaData();

    metadata.user += 1;
    const userID = metadata.user;

    newUser.ID = userID;
    const curUsers: IUser[] = await getUserData();
    curUsers.push(newUser);

    await saveMetaData(metadata); // increments number of users

    return saveUserData(curUsers); // save array of users
  } catch (err) {
    throw new Error();
  }
};

export { createUser };
