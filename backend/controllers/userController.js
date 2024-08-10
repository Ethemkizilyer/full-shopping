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
    isAdmin: username === "Admin" ? true : false,
  });

  // Database ekleniyor
  await newUser.save();

  // Yeni kullanıcıya token veriliyor
  const token = generateToken(newUser);

  return res.status(201).json({ token, username,isAdmin: username === "Admin" ? true : false});
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
const getUsers =async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

  // Kullanıcının admin olup olmadığını kontrol et
  if (user && user.isAdmin === true && user.username === 'Admin') {
    return res.status(403).json({ message: 'Bu kullanıcı silinemez.' });
  }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body; // Expecting a boolean value

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = isAdmin; // Update admin status
    await user.save();

    res.status(200).json({ message: 'User admin status updated', user });
  } catch (error) {
    console.error('Error updating user admin status:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}



module.exports = { register, login, getUsers, deleteUser, updateUser };
