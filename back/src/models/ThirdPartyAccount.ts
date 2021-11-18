import { Schema, model, ObjectId } from 'mongoose';
import { IUser } from './User';

export interface IThirdPartyAccount {
  _id: ObjectId;
  alias: string;
  bank: string;
  number: string;
  holder: string;
  currency: string;
  owner: IUser['_id'];
  date?: Date;
}

const schema = new Schema<IThirdPartyAccount>({
  alias: {
    type: String,
    require: true,
    min: 5,
    max: 30,
  },
  bank: {
    type: String,
    require: true,
    min: 3,
    max: 30,
  },
  number: {
    type: String,
    require: true,
    min: 9,
    max: 20,
  },
  holder: {
    type: String,
    require: true,
    min: 9,
    max: 20,
  },
  currency: {
    type: String,
    require: true,
    default: 'COP',
  },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ThirdPartyAccountModel = model<IThirdPartyAccount>(
  'ThirdPartyAccount',
  schema
);

export default ThirdPartyAccountModel;
