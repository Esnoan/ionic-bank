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

export default class UserController {
  public async register(req: Request, res: Response) {
    try {
      const schemaRegister = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
      });

      const { error } = schemaRegister.validate(req.body);

      if (error) {
        return res
          .status(400)
          .json({ success: false, error: error.details[0].message });
      }

      const isEmailExist = await User.findOne({ email: req.body.email });
      if (isEmailExist) {
        return res
          .status(400)
          .json({ success: false, error: 'E-mail already registered' });
      }

      const user = await createUser(req.body);
      return res.status(200).send({ success: true });
    } catch (e: any) {
      httpError(res, e);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const schemaLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
      });
      const { error } = schemaLogin.validate(req.body);
      if (error)
        return res
          .status(400)
          .json({ success: false, error: error.details[0].message });

      const user = await findUser(req.body.email);
      if (!user)
        return res
          .status(400)
          .json({ success: false, error: 'User not found' });

      const validPassword = await checkUserPassword(user, req.body.password);
      if (!validPassword)
        return res
          .status(400)
          .json({ success: false, error: 'Invalid Password' });

      const token = await generateToken(user);

      return res.json({
        success: true,
        data: {
          token,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }
}
