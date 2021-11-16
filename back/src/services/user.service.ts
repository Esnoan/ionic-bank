import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';

export const createUser = async (body: any): Promise<IUser> => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(body.password, salt);

  const user = new User({
    name: body.name,
    email: body.email,
    password,
  });

  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

export const findUser = async (email: string): Promise<IUser> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const checkUserPassword = async (
  user: IUser,
  password: string
): Promise<boolean> => {
  try {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

export const generateToken = async ({
  name,
  email,
}: IUser): Promise<string> => {
  try {
    const token = jwt.sign(
      {
        name,
        email,
      },
      process.env.TOKEN_SECRET || ''
    );
    return token;
  } catch (error) {
    throw error;
  }
};
