// server/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const invalidTokens = [];


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    if (invalidTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log("user",user)
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

 const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers['authorization']; 
    if (!token) return res.sendStatus(401); // 

    if (invalidTokens.includes(token)) {
      return res.sendStatus(403); 
    }
    console.log("token:", token);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      console.log("decoded:", decoded);
      if (err) {
        console.error('JWT verification error:', err);
        return res.sendStatus(403); // Token eşleşmiyor
      }

      const user = await User.findById(decoded.id);

      console.log('Decoded:', decoded);
      console.log('User DB:', user);

      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Erişim engeli' });
      }

      req.user = user; 
      next(); 
    });

  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};



const logout = (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
        invalidTokens.push(token);
    }
    res.json({ message: 'Logged out successfully' });
};

module.exports = { authenticateToken, authenticateAdmin, logout };
