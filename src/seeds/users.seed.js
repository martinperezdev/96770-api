import bcrypt from 'bcryptjs';

import { UserModel } from '../models/user.model.js';
import { logger } from '../utils/logger.js';

const initialUsers = [
  {
    username: 'admin',
    email: 'admin@coder.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    username: 'user',
    email: 'user@coder.com',
    password: 'user123',
    role: 'user',
  },
];

export async function seedUsers() {
  const usersCount = await UserModel.estimatedDocumentCount();

  if (usersCount > 0) {
    logger.info({
      msg: 'Users seed skipped',
      reason: 'Users already exist',
    });

    return;
  }

  const usersToCreate = await Promise.all(
    initialUsers.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  await UserModel.insertMany(usersToCreate);

  logger.info({
    msg: 'Users seed completed',
    users: initialUsers.map((user) => ({
      username: user.username,
      email: user.email,
      role: user.role
    })),
  });
}