const jwt = require('jsonwebtoken');
const invalidTokens = [];

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  if (invalidTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const logout = (req, res) => {
  const token = req.headers['authorization'];
  if (token) {
    invalidTokens.push(token);
  }
  res.json({ message: 'Logged out successfully' });
};

module.exports = { authenticateToken,logout };
