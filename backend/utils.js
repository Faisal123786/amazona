import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRETE,
    {
      expiresIn: '30d',
    }
  );
};
