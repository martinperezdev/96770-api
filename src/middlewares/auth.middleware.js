import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { createError } from '../utils/createError.js';

export function authenticate(req, res, next){
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return next(createError('Token is required', 401));
  }

  //Bearer jasdkk1123123123
  const [type, token] = authHeader.split(' ');

  if(type !== 'Bearer' || !token){
    return next(createError('Invalid auth format', 401));
  }

  try {
    const decodeUser = jwt.verify(token, env.jwtSecret);

    req.user = decodeUser;

    next();
  } catch (error) {
    return next(createError('Invalid or expired token', 401));
  }
}

export function authorizeAdmin(req, res, next){

  if(!req.user){
    return next(createError('User not authenticated', 401));
  }

  if(req.user.role !== 'admin'){
    return next(createError('Forbidden', 403));
  }

  next();
}