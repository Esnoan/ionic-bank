import express, { Request, Response } from 'express';
import AccountController from '../controllers/account.controller';
import { handleToken } from '../helpers/handleToken';
const router = express.Router();

const accountController = new AccountController();

router.get('/', handleToken, accountController.list);
router.post('/', handleToken, accountController.create);

export { router };
