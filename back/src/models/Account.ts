import { Schema, model, ObjectId } from 'mongoose';
import { IUser } from './User';

export interface IAccount {
  _id: ObjectId;
  number: string;
  balance: number;
  owner: IUser['_id'];
  date?: Date;
}

const schema = new Schema<IAccount>({
  number: {
    type: String,
    require: true,
    min: 16,
    max: 16,
  },
  balance: {
    type: Number,
    require: true,
    default: 0,
  },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AccountModel = model<IAccount>('Account', schema);

export default AccountModel;
