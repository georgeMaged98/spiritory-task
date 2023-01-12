import { promisify } from 'util';
import { randomBytes, scrypt } from 'crypto';

const scryptAsync = promisify(scrypt);

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = password;

  const salt: string = randomBytes(16).toString('hex');

  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString('hex')}.${salt}`;
};

const compare = async (
  databasePassword: string,
  userPassword: string
): Promise<boolean> => {
  const [hashedPassword, salt] = databasePassword.split('.');
  const buf = (await scryptAsync(userPassword, salt, 64)) as Buffer;

  return buf.toString('hex') === hashedPassword;
};

export { hashPassword, compare };
