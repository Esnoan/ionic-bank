import { Request, Response } from 'express';
import { httpError } from '../helpers/handleError';
import { findUser } from '../services/user.service';
import {
  createThirdPartyAccount,
  listThirdPartyAccounts,
} from '../services/third-party-account.service';

export default class ThirdPartyAccountController {
  public async create(req: Request, res: Response) {
    try {
      const user = await findUser(req.user.email);

      const account = await createThirdPartyAccount(req.body, user);
      return res.json({
        success: true,
        data: {
          account,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const user = await findUser(req.user.email);
      const accounts = await listThirdPartyAccounts(user);
      return res.json({
        success: true,
        data: {
          accounts,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }
}
