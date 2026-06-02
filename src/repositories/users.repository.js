import { UserModel } from '../models/user.model.js';

export async function findUserByEmail(email) {
  return UserModel.findOne({ email }).lean();
}