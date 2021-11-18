import Account, { IAccount } from '../models/Account';
import { IUser } from '../models/User';
import { randomNumber } from '../utils/randomNumber';

export const createAccount = async (user: IUser): Promise<IAccount> => {
  const account = new Account({
    number: randomNumber(),
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
