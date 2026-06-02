import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { findUserByEmail } from '../repositories/users.repository.js';
import { successResponse } from '../utils/apiResponse.js';
import { createError } from '../utils/createError.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError('Email and password are required', 400));
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return next(createError('Invalid credentials', 401));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(createError('Invalid credentials', 401));
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      env.jwtSecret,
      {
        expiresIn: env.jwtExpiresIn,
      }
    );

    return successResponse(res, {
      message: 'Login successful',
      payload: {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}