import bcrypt from 'bcrypt';

import User from '../../models/user.js';
import generateToken from '../../utils/tokenUtils.js';

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate('role');

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const userCallback = {
        _id: user._id,
        username: user.username,
        surname: user.username,
        email: user.email,
        role: user.role.name,
      };

      const token = generateToken(user._id);

      // res.cookie('token', token, { httpOnly: false, secure: false });
      // res.cookie('user', JSON.stringify(userCallback), { httpOnly: false, secure: false });
      res.setHeader('Authorization', `Bearer ${token}`);

      return res.status(200).json({ message: 'Auth success.', user: userCallback , token });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });

    res.status(200).send('Logged out successfully.');
  },
};

export default authController;
