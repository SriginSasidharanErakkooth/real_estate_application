import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password'); //('-password') means don't select the password
      console.log(req.user)

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({"message":"Not authorized, token failed","success":false});
    }
  } else {
    res.status(401).send({"message":"Not authorized","success":false});
  }
};

module.exports={auth};
