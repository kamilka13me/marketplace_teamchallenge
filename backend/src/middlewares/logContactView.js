import ContactView from '../models/ContactView';

/**
 * Middleware to log contact views
 */
const logContactView = async (req, res, next) => {
  try {
    const { sellerId } = req.query;
    const { userId } = req.body;

    if (!sellerId || !userId) {
      return res.status(400).json({ error: 'sellerId and userId are required' });
    }

    const contactView = new ContactView({
      sellerId,
      userId,
      date: new Date(),
    });

    await contactView.save();

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error logging contact view:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default logContactView;
