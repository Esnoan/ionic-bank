import express, { Request, Response } from 'express';
import ThirdPartyAccountController from '../controllers/third-party-account.controller';
import { handleToken } from '../helpers/handleToken';
const router = express.Router();

const thirdPartyAccountController = new ThirdPartyAccountController();

router.get('/', handleToken, thirdPartyAccountController.list);
router.post('/', handleToken, thirdPartyAccountController.create);

export { router };
