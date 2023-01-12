import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { hashPassword } from '../helpers/hashPassword';
import { createUser } from '../services/user.service';

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Email, Name, LastName, Birthday, Password }: IUser = req.body;

    const hashedPassword = await hashPassword(Password);
    const newUser: IUser = {
      Email,
      Name,
      LastName,
      Birthday: new Date(Birthday),
      Password: hashedPassword,
    };

    await createUser(newUser);
    delete newUser.Password; // not returning password for security

    res.status(201).send({
      user: newUser,
    });
  } catch (err) {
    next(new Error());
  }
};

export { postUser };
