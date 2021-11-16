import { Request, Response } from 'express';
import Joi from 'joi';

import { httpError } from '../helpers/handleError';
import { findUser } from '../services/user.service';
import User, { IUser } from '../models/User';
import { createAccount, listAccounts } from '../services/account.service';

export default class AccountController {
  public async create(req: Request, res: Response) {
    try {
      const user = await findUser(req.user.email);
      const account = await createAccount(user);
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
      const accounts = await listAccounts(user);
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
