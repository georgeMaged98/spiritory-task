import { promisify } from 'util';
import { randomBytes, scrypt } from 'crypto';

const scryptAsync = promisify(scrypt);

const hashPassword = async (password: string | undefined): Promise<string> => {
  if (!password) throw new Error('Passwor is Required!'); // to removed error in case password is not supported

  const salt: string = randomBytes(16).toString('hex');

  const buf: Buffer = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString('hex')}.${salt}`;
};

const compare = async (
  databasePassword: string,
  userPassword: string
): Promise<boolean> => {
  const [hashedPassword, salt]: string[] = databasePassword.split('.');
  const buf: Buffer = (await scryptAsync(userPassword, salt, 64)) as Buffer;

  return buf.toString('hex') === hashedPassword;
};

export { hashPassword, compare };
