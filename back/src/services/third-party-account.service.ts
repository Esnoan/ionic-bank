import ThirdPartyAccount, {
  IThirdPartyAccount,
} from '../models/ThirdPartyAccount';
import { IUser } from '../models/User';

export const createThirdPartyAccount = async (
  body: any,
  user: IUser
): Promise<IThirdPartyAccount> => {
  const { number, alias, bank, holder, currency } = body;
  const account = new ThirdPartyAccount({
    alias,
    bank,
    number,
    holder,
    currency,
    owner: user._id,
  });

  try {
    const savedAccount = await account.save();
    return savedAccount;
  } catch (error) {
    throw error;
  }
};

export const listThirdPartyAccounts = async (
  user: any
): Promise<IThirdPartyAccount[]> => {
  try {
    const accounts = await ThirdPartyAccount.find({ owner: user._id });
    return accounts;
  } catch (error) {
    throw error;
  }
};
