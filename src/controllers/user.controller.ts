import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { IMetadata } from '../interfaces/metadata.interface';
import {
  getMetaData,
  getUserData,
  saveMetaData,
  saveUserData,
} from '../helpers/database';
import { hashPassword } from '../helpers/hashPassword';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, lastName, birthday, password } = req.body;
    const metadata: IMetadata = await getMetaData();
    console.log(metadata);

    metadata.user += 1;
    const userID = metadata.user;

    await saveMetaData(metadata);

    const hashedPassword = await hashPassword(password);
    const newUser: IUser = {
      ID: userID,
      Email: email,
      Name: name,
      LastName: lastName,
      Birthday: new Date(birthday),
      Password: hashedPassword,
    };

    const curUsers: IUser[] = await getUserData();
    curUsers.push(newUser);

    await saveUserData(curUsers);

    delete newUser.Password;
    res.send({
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    next(new Error());
  }
};

export { postUser };
