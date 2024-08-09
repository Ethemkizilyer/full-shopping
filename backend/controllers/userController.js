const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = (user) => {

  const payload = {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin, // Admin durumu
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const register = async (req, res) => {
  const { username, password } = req.body;


  const userExists = await User.findOne({ username });

  if (userExists) {
    return res.status(400).json({ message: 'Kullanıcı adı zaten var' });
  }


  const newUser = new User({
    username,
    password,
  });

  // Database ekleniyor
  await newUser.save();

  // Yeni kullanıcıya token veriliyor
  const token = generateToken(newUser);

  return res.status(201).json({ token, username });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && await user.matchPassword(password)) {
      const token = jwt.sign({ id:user._id,username,isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, username,isAdmin: user.isAdmin });
    }

    return res.status(401).json({ message: 'Geçersiz kimlik' });
  } catch (error) {
    console.error('Giriş hatası:', error);
    return res.status(500).json({ message: 'Server hatası' });
  }
};

module.exports = { register, login };
