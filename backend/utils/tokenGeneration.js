const jwt =require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  res.cookie('reapp', token, { // 'reapp' is the cookie name and 'token' is the value. this is stored in the browser as key value pairs
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 2 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports ={generateToken};