import { Schema, model, ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  date?: Date;
}

const schema = new Schema<IUser>({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model<IUser>('User', schema);

export default UserModel;
