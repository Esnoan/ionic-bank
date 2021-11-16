import { Request, Response } from 'express';
import Joi from 'joi';

import { httpError } from '../helpers/handleError';
import {
  checkUserPassword,
  createUser,
  findUser,
  generateToken,
} from '../services/user.service';
import User, { IUser } from '../models/User';

export default class DashboardController {
  public async register(req: Request, res: Response) {
    try {
      res.json({
        error: null,
        data: {
          title: 'Esta es una ruta protegida',
          user: req.user,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }
}
