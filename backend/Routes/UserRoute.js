import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signIn',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.Password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid Email or Password' });
  })
);

export default userRouter;
