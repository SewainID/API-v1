const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Access denied!' });
  }

  try {
    req.user = jwt.verify(token, 'PisangGoreng720' || process.env.TOKEN_KEY); //verified token
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};
