import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import randomBytes from 'randombytes';
import { TTL } from '../constants/contacts.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'Invalid email or password');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Invalid email or password');

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(50).toString('base64');
  const refreshToken = randomBytes(50).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(
      Date.now() + TTL.ACCESS_TOKEN.FIFTEEN_MINUTES,
    ),
    refreshTokenValidUntil: new Date(
      Date.now() + TTL.REFRESH_TOKEN.THIRTY_DAYS,
    ),
  });
};
