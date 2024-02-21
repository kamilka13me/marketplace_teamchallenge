import bcrypt from 'bcrypt';

import BrowserInfo from '../../models/BrowserInfo.js';
import User from '../../models/User.js';
import generateToken from '../../utils/tokenUtils.js';

const authController = {
  login: async (req, res) => {
    try {
      const { email, password, info } = req.body;
      const userIp = req.ip;
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

      const newBrowserInfo = new BrowserInfo({
        ...info,
        userIp,
        userId: user._id,
      });

      newBrowserInfo.save();

      // res.cookie('token', token, { httpOnly: false, secure: false });
      // res.cookie('user', JSON.stringify(userCallback), { httpOnly: false, secure: false });
      res.setHeader('Authorization', `Bearer ${token}`);

      return res
        .status(200)
        .json({ message: 'Auth success.', user: userCallback, token });
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

  setToken: async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send('Token is required');
    }

    res.cookie('token', token, { httpOnly: true });

    return res.send('Token has been set in cookies');
  },
};

export default authController;
