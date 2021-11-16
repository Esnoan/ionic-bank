import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Account, { IAccount } from '../models/Account';
import { IUser } from '../models/User';

export const createAccount = async (user: IUser): Promise<IAccount> => {
  const account = new Account({
    number: makeRandomId(),
    owner: user._id,
  });

  try {
    const savedAccount = await account.save();
    return savedAccount;
  } catch (error) {
    throw error;
  }
};

export const listAccounts = async (user: any): Promise<IAccount[]> => {
  try {
    const accounts = await Account.find({ owner: user._id });
    return accounts;
  } catch (error) {
    throw error;
  }
};

const makeRandomId = () => {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
