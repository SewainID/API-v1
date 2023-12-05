const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied! Token not provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Access forbidden! Invalid token.' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Error in authenticateToken middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { authenticateToken };
